import L from 'leaflet' 
import { AnyAction } from 'redux';
import { State } from '../state';
import { ADD_TO_TABLE } from '../actions';

export default function getMapData(state: State, action: AnyAction){
    switch (action.type)
    {
        case ADD_TO_TABLE:

            return {
                ...state,
                components: {
                    ...state.components,
                    selected: state.List.length - 1
                }
            }
        default:
            return state;
    }
}