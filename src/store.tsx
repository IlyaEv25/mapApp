import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import initialState from './state'

import { getList, setMap, get } from './reducers/globalReducers';
import componentsReducer from './reducers/componentsReducers';
import selectElement from './reducers/selectElement';

import rootSaga from './sagas';

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
