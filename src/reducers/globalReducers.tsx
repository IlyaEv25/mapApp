import { ReqEntry, ReqData} from "../state";
import initialState from "../state";
import { GET_LIST, SELECT, SET_MAP, SET_POLYLINE } from "../actions";

import { AnyAction } from 'redux';


export const getList = (state: Array<ReqEntry> = initialState.List, action: AnyAction): Array<ReqEntry> => {

    switch(action.type)
    {
        case GET_LIST:
            return action.list;
        case "ADD_TO_TABLE":
            console.log(action);
            return [
                ...state,
                {
                    id: state.length,
                    key: state.length,
                    from: action.data.from.name,
                    to: action.data.to.name,
                    data: {
                        from: action.data.from,
                        to: action.data.to,
                        route: action.data.route
                    }
                }
                ]
        default:
            return state;
    }

}

//better types for reducers

// export const select = (state: ReqData = initialState.SelectedReq, action: AnyAction): ReqData => {

//     switch(action.type)
//     {
//         case SELECT:
//             console.log(action);
//             return action.data;
//         default:
//             return state;
//     }
// }

export const setMap = (state = initialState.mapData, action) => {
    switch (action.type)
    {
        case SET_MAP:
            return {
                ...state,
                mapPointer:action.map
            };

        default:
            return state;
    }
}

export const get = (state: ReqData = initialState.SelectedReq, action: AnyAction): ReqData => {

    switch(action.type)
    {
        case "GET":
            //console.log(action);
            return action.data;
        default:
            return state;
    }
}
