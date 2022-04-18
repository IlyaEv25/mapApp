import {all, takeEvery, takeLatest} from 'redux-saga/effects'
import { EDIT_SAGA, PUT_SAGA, SEARCH_LIST_SAGA, SELECT_SAGA } from './actions';
import {fetchSearchList, fetchGet, fetchEdit, fetchSelect} from './apiFetchs'
 
 function* searchListSaga() {
     yield takeLatest(SEARCH_LIST_SAGA, fetchSearchList)
 }
 
 
 function* getSaga() {
    yield takeEvery(PUT_SAGA, fetchGet);
 }
 
 function* editSaga() {
    yield takeLatest(EDIT_SAGA, fetchEdit);
 }
 
 function* selectSaga() {
    yield takeEvery(SELECT_SAGA, fetchSelect);
 }
 
 export default function* rootSaga() {
    yield all([
      getSaga(),
      selectSaga(),
      searchListSaga(),
      editSaga()
    ])
  }