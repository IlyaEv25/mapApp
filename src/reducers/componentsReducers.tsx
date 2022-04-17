import {SELECT} from '../actions'
import { combineReducers } from 'redux';
import initialState from '../state'


const selectTable = (state = initialState.components.selected, action) => {
    switch (action.type)
    {
        case SELECT:
            return action.key;
        default:
            return state;
    }
}

const fromList = (state = initialState.components.fromSelectedList, action) => {
    switch (action.type)
    {
        case "GET_SEARCH_LIST":
            return action.list;
        default:
            return state;
    }
}


const componentsReducer = combineReducers({
    border: (state = initialState.components.border, action) => state,
    selected: selectTable,
    filteredList: (state = initialState.components.filteredList, action) => state,
    edited: (state = initialState.components.edited, action) => state,
    fromSelectedList: fromList,
    toSelectedList: (state = initialState.components.toSelectedList, action) => state
 })

 export {componentsReducer as default}