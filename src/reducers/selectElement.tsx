import L from 'leaflet/dist/leaflet' 

export default function getMapData(state, action){
    switch (action.type)
    {
        case "ADD_TO_TABLE":

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