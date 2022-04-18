import {all, takeEvery, takeLatest} from 'redux-saga/effects'
import {fetchSearchList, fetchGet, fetchEdit, fetchData, fetchSelect} from './apiFetchs'
 
 function* searchListSaga() {
     yield takeLatest("SEARCH_LIST_SAGA", fetchSearchList)
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
 
 export default function* rootSaga() {
    yield all([
      initSaga(),
      getSaga(),
      selectSaga(),
      searchListSaga(),
      editSaga()
    ])
  }