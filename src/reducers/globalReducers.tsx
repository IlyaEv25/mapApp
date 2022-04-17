import { ReqEntry, ReqData} from "../state";
import initialState from "../state";
import { GET_LIST, SELECT, SET_MAP } from "../actions";

import { AnyAction } from 'redux';


export const getList = (state: Array<ReqEntry> = initialState.List, action: AnyAction): Array<ReqEntry> => {

    switch(action.type)
    {
        case GET_LIST:
            return action.list;
        default:
            return state;
    }

}

//better types for reducers

export const select = (state: ReqData = initialState.SelectedReq, action: AnyAction): ReqData => {

    switch(action.type)
    {
        case SELECT:
            console.log(action);
            return action.data;
        default:
            return state;
    }
}

export const setMap = (state = initialState.mapPointer, action) => {
    switch (action.type)
    {
        case SET_MAP:
            return action.map;
        default:
            return state;
    }
}

