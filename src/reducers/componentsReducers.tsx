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

const mousePressed = (state = initialState.components.mouseDown, action) => {
    switch (action.type)
    {
        case "MOUSE_DOWN":
            return action.mouse_down;
        default:
            return state;
    }
}

const setX = (state = initialState.components.xStart, action) => {
    switch (action.type)
    {
        case "X_START":
            return action.x;
        default:
            return state;
    }
}

const setBorder = (state = initialState.components.border, action) => {
    switch (action.type)
    {
        case "SET_BORDER":
            return action.border;
        default:
            return state;
    }
}

const setStartBorder = (state = initialState.components.startBorder, action) => {
    switch (action.type)
    {
        case "SET_START_BORDER":
            return action.start_border;
        default:
            return state;
    }
}

const setEdited = (state = initialState.components.edited, action) => {
    switch (action.type)
    {
        case "SET_EDITED":
            console.log(action);
            return action.edited;
        default:
            return state;
    }
}

const setEditedType = (state = initialState.components.editedType, action) => {
    switch (action.type)
    {
        case "SET_EDITED":
            console.log(action);
            return action.edit_type;
        default:
            return state;
    }
}


const componentsReducer = combineReducers({
    border: setBorder,
    startBorder: setStartBorder,
    xStart: setX,
    mouseDown: mousePressed,
    selected: selectTable,
    filteredList: (state = initialState.components.filteredList, action) => state,
    edited: setEdited,
    editedType: setEditedType,
    fromSelectedList: fromList,
    toSelectedList: (state = initialState.components.toSelectedList, action) => state
 })

 export {componentsReducer as default}