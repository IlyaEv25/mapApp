import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { ReqEntry } from './state';
import initialState from './state'

import { getList, select } from './reducers/globalReducers';

var server: string = "http://localhost:3000/";

export const getContacts = async (): Promise<Array<ReqEntry>> => {
  var data = await fetch(server + "db/").then(data => data.json());
  return data.db;
}

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

// Starts fetchUser on each dispatched USER_FETCH_REQUESTED action
// Allows concurrent fetches of user
function* mySaga() {
  yield takeEvery("INIT", fetchData);
}


const reducer = combineReducers({
    List: getList,
    SelectedReq: select,
    components: (state = initialState.components, action) => state
 })


const sagaMiddleware = createSagaMiddleware()
// mount it on the Store
export const store = createStore(
  reducer,
  initialState,
  applyMiddleware(sagaMiddleware)
)

// then run the saga
sagaMiddleware.run(mySaga)
