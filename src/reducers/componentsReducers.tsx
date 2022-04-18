import {GET_SEARCH_LIST, MOUSE_DOWN, SELECT, SET_BORDER, SET_EDITED, SET_START_BORDER, X_START} from '../actions'
import { AnyAction, combineReducers, Reducer } from 'redux';
import initialState, { GeoPoint, ComponentsData } from '../state'


const selectTable = (state: number = initialState.components.selected, action: AnyAction): number => {
    switch (action.type)
    {
        case SELECT:
            return action.key;
        default:
            return state;
    }
}

const fromList = (state: Array<GeoPoint> = initialState.components.fromSelectedList, action: AnyAction): Array<GeoPoint> => {
    switch (action.type)
    {
        case GET_SEARCH_LIST:
            return action.list;
        default:
            return state;
    }
}

const mousePressed = (state:boolean = initialState.components.mouseDown, action: AnyAction):boolean => {
    switch (action.type)
    {
        case MOUSE_DOWN:
            return action.mouse_down;
        default:
            return state;
    }
}

const setX = (state:number = initialState.components.xStart, action: AnyAction):number => {
    switch (action.type)
    {
        case X_START:
            return action.x;
        default:
            return state;
    }
}

const setBorder = (state:number = initialState.components.border, action: AnyAction): number => {
    switch (action.type)
    {
        case SET_BORDER:
            return action.border;
        default:
            return state;
    }
}

const setStartBorder = (state = initialState.components.startBorder, action: AnyAction):number => {
    switch (action.type)
    {
        case SET_START_BORDER:
            return action.start_border;
        default:
            return state;
    }
}

const setEdited = (state = initialState.components.edited, action: AnyAction): number => {
    switch (action.type)
    {
        case SET_EDITED:
            console.log(action);
            return action.edited;
        default:
            return state;
    }
}

const setEditedType = (state: "from"|"to" = initialState.components.editedType, action: AnyAction): "from"|"to" => {
    switch (action.type)
    {
        case SET_EDITED:
            console.log(action);
            return action.edit_type;
        default:
            return state;
    }
}


const componentsReducer: Reducer<ComponentsData, AnyAction> = combineReducers({
    border: setBorder,
    startBorder: setStartBorder,
    xStart: setX,
    mouseDown: mousePressed,
    selected: selectTable,
    edited: setEdited,
    editedType: setEditedType,
    fromSelectedList: fromList
 })

 export {componentsReducer as default}