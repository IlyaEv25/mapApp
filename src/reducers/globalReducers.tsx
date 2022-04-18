import { ReqEntry, ReqData} from "../state";
import initialState from "../state";
import { ADD_TO_TABLE, DELETE_ELEMENT, EDIT_LIST, GET_LIST,  PUT_DATA_MAP,  SET_MAP } from "../actions";

import { AnyAction } from 'redux';


export const getList = (state: Array<ReqEntry> = initialState.List, action: AnyAction): Array<ReqEntry> => {

    switch(action.type)
    {
        case GET_LIST:
            return action.list;
        case ADD_TO_TABLE:
            console.log(action);
            var prev_id = state.length > 0 ? state[state.length - 1].id : -1;
            return [
                ...state,
                {
                    id: prev_id+ 1,
                    key: prev_id + 1,
                    from: action.data.from.name,
                    to: action.data.to.name,
                    data: {
                        from: action.data.from,
                        to: action.data.to,
                        route: action.data.route
                    }
                }
                ]
        case EDIT_LIST:
            return state.map(entry => {
                if (entry.key == action.key)
                    return {
                        id: entry.key,
                        key: entry.key,
                        from: action.data.from.name,
                        to: action.data.to.name,
                        data: {
                            from: action.data.from,
                            to: action.data.to,
                            route: action.data.route
                        }
                    }
                else
                    return entry;
            })
        case DELETE_ELEMENT:
            return state.filter(entry => entry.id != action.id);
        default:
            return state;
    }

}

export const setMap = (state = initialState.mapPointer, action: AnyAction) => {
    switch (action.type)
    {
        case SET_MAP:
            return action.map;

        default:
            return state;
    }
}

export const get = (state: ReqData = initialState.SelectedReq, action: AnyAction): ReqData => {

    switch(action.type)
    {
        case PUT_DATA_MAP:
            //console.log(action);
            return action.data;
        default:
            return state;
    }
}
