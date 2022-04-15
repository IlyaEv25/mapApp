import { ReqEntry, ReqData} from "../state";
import initialState from "../state";
import { GET_LIST, SELECT } from "../actions";

import { AnyAction } from 'redux';


const getList = (state: Array<ReqEntry> = initialState.List, action: AnyAction): Array<ReqEntry> => {

    switch(action.type)
    {
        case GET_LIST:
            return action.list;
        default:
            return state;
    }

}

//better types for reducers

const select = (state: ReqData = initialState.SelectedReq, action: AnyAction): ReqData => {

    switch(action.type)
    {
        case SELECT:
            return action.data;
        default:
            return state;
    }
}

