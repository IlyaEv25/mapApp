import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { call, put, all, takeEvery, takeLatest } from 'redux-saga/effects'
import { ReqEntry } from './state';
import initialState from './state'

import { getList, select, setMap } from './reducers/globalReducers';
import componentsReducer from './reducers/componentsReducers';
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
   var resp = await fetch(`http://router.project-osrm.org/route/v1/driving/${coord0[0]},${coord0[1]};${coord1[0]},${coord1[1]}?` + options);
   var str = await resp.text();
   return JSON.parse(str)
 }
 
async function get_coord(name)
{
   return fetch(`https://nominatim.openstreetmap.org/search?q=${name}&format=json`).then(res => res.json()).then(f => [f[0].lon,  f[0].lat])
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
   console.log(action);
   var from = yield call(get_coord, action.from);
   var to = yield call(get_coord, action.to);

   var route = yield call(read_route, "overview=full&geometries=geojson", from, to);
   console.log(from, to, route.routes[0].geometry.coordinates);

   var reqData = {
      from: toGeoPoint(from, action.from),
      to: toGeoPoint(to, action.to),
      route: route.routes[0].geometry.coordinates.map(coord => toGeoPoint(coord))
    }


   yield put({type: SELECT, data: reqData, key: action.key});


}

function* fetchCheck()
{
   console.log("!");
   // var from = yield call(get_coord, action.from);
   // var to = yield call(get_coord, action.to);

   // var route = yield call(read_route, "overview=full&geometries=geojson", from, to);
   // console.log(from, to, route.routes[0].geometry.coordinates);

   // var reqData = {
   //    from: toGeoPoint(from, action.from),
   //    to: toGeoPoint(to, action.to),
   //    route: route.routes[0].geometry.coordinates.map(coord => toGeoPoint(coord))
   //  }



   //yield put({type: "CHECK"})


}



function* checkSaga() {
   yield takeEvery("CHECK", fetchCheck);
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
     checkSaga(),
     selectSaga()
   ])
 }
 


const reducer = combineReducers({
    mapPointer: setMap,
    List: getList,
    SelectedReq: select,
    components: componentsReducer
 })


const sagaMiddleware = createSagaMiddleware()
// mount it on the Store
export const store = createStore(
  reducer,
  initialState,
  applyMiddleware(sagaMiddleware)
)

// then run the saga
sagaMiddleware.run(rootSaga)
