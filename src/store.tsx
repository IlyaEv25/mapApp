import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { call, put, all, takeEvery, takeLatest } from 'redux-saga/effects'
import { ReqEntry } from './state';
import initialState from './state'

import { getList, setMap, get } from './reducers/globalReducers';
import componentsReducer from './reducers/componentsReducers';
import selectElement from './reducers/selectElement';

import { SELECT } from './actions';

var server: string = "http://localhost:3000/";

// fetch("http://localhost:3000/entries/1", {
//     method: "PUT",
//     headers: {
//       'Content-Type': 'application/json'
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     body: JSON.stringify({.., abc: 2})

// })

async function read_route(options, coord0, coord1){
   try
   {
    var resp = await fetch(`http://router.project-osrm.org/route/v1/driving/${coord0[0]},${coord0[1]};${coord1[0]},${coord1[1]}?` + options);
    var str = await resp.text();
   }
   catch(e) {
       var str = "{}";
       console.log(e);
   }
   return JSON.parse(str)
 }
 
async function get_coord(name)
{
   return fetch(`https://nominatim.openstreetmap.org/search?q=${name}&format=json`).then(res => res.json()).then(f => f[0]?[f[0].lon,  f[0].lat]:[])
}

async function get_list(name)
{
   return fetch(`https://nominatim.openstreetmap.org/search?q=${name}&format=json`).then(res => res.json())
}

export const getContacts = async (): Promise<Array<ReqEntry>> => {
  var data = await fetch(server + "entries/").then(data => data.json());
  return data;
}

// function* getEntryWithData(entry) {
//    var from = entry.from;
//    var to = entry.to;

//    var from = yield call(get_coord, action.from);
//    var to = yield call(get_coord, action.to);

//    var route = yield call(read_route, "overview=full&geometries=geojson", from, to);


// }


// Worker saga will be fired on USER_FETCH_REQUESTED actions
function* fetchData() {
   try {
      console.log("HAHA");
      const list = yield call(getContacts);

      console.log(list);
      yield put({type: "GET_LIST", list: list});
   } catch (e) {
      yield put({type: "USER_FETCH_FAILED", message: e.message});
   }
}


const toGeoPoint = (coord, name = "") => ({name : name, x: coord[0], y: coord[1]});

function* fetchSelect(action)
{
   console.log(action, !action.route);
   var reqData;
   if (!action.route)
   {
    var from = yield call(get_coord, action.from);
    var to = yield call(get_coord, action.to);

    var route_res = yield call(read_route, "overview=full&geometries=geojson", from, to);
    var route = route_res.routes[0].geometry.coordinates.map(coord => toGeoPoint(coord));
    //console.log(from, to, route.routes[0].geometry.coordinates);
    reqData = {
        from: toGeoPoint(from, action.from),
        to: toGeoPoint(to, action.to),
        route: route
      }
   }
   else
   {
    var route = action.route.route;
    reqData = {
        from: action.route.from,
        to: action.route.to,
        route: route
      }
   }



   yield put({type: "GET", data: reqData});
   yield put({type: SELECT, key: action.key});


}


function* fetchGet(action)
{
   console.log("!");
   var from = yield call(get_coord, action.data.from);
   var to = yield call(get_coord, action.data.to);

   var route = yield call(read_route, "overview=full&geometries=geojson", from, to);
   //console.log(from, to, route.routes[0].geometry.coordinates);

   var reqData = {
      from: toGeoPoint(from, action.data.from),
      to: toGeoPoint(to, action.data.to),
      route: route.routes? route.routes[0].geometry.coordinates.map(coord => toGeoPoint(coord)) : null
    }


   yield put({type: "GET", data: reqData});
   yield put({type: "ADD_TO_TABLE", data: reqData})


}

function* fetchEdit(action)
{
   console.log("EDIT", action);
   var from = yield call(get_coord, action.from);
   var to = yield call(get_coord, action.to);

   var route = yield call(read_route, "overview=full&geometries=geojson", from, to);
   //console.log(from, to, route.routes[0].geometry.coordinates);

   var reqData = {
      from: toGeoPoint(from, action.from),
      to: toGeoPoint(to, action.to),
      route: route.routes? route.routes[0].geometry.coordinates.map(coord => toGeoPoint(coord)) : null
    }


   yield put({type: "GET", data: reqData});
   yield put({type: "EDIT_LIST", data: reqData, key: action.key})


}

function* fetchSearchList(action)
{
    console.log(action);
    var name_list = yield call(get_list, action.str);
    console.log(name_list.map(entry => toGeoPoint([entry.lat, entry.lon], entry.display_name)));
    yield put({type: "GET_SEARCH_LIST", list: name_list.map(entry => toGeoPoint([entry.lat, entry.lon], entry.display_name))});
}


function* searchListSaga() {
    yield takeEvery("SEARCH_LIST_SAGA", fetchSearchList)
}


function* getSaga() {
   yield takeEvery("GET_DATA", fetchGet);
}

function* editSaga() {
   yield takeLatest("EDIT_SAGA", fetchEdit);
}

// Starts fetchUser on each dispatched USER_FETCH_REQUESTED action
// Allows concurrent fetches of user
function* initSaga() {
  yield takeEvery("INIT", fetchData);
}

function* selectSaga() {
   yield takeEvery("SELECT_SAGA", fetchSelect);
}

function* rootSaga() {
   yield all([
     initSaga(),
     getSaga(),
     selectSaga(),
     searchListSaga(),
     editSaga()
   ])
 }
 


const reducer = combineReducers({
    mapData: setMap,
    List: getList,
    SelectedReq: get,
    components: componentsReducer,
    
 })

 function rootReducer(state, action) {
    const intermediateState = reducer(state, action)
    const finalState = selectElement(intermediateState, action)
    return finalState
  }
  


const sagaMiddleware = createSagaMiddleware()
// mount it on the Store
export const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware)
)

// then run the saga
sagaMiddleware.run(rootSaga)
