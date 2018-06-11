import { SET_TOKEN, SET_STATION_ID, SET_STATION_NAME } from '../actions/ActionTypes';

const initialState = {
    token: "",
    stationId:"",
    StationName: "",
}

export function AuthorizationReducer(state = initialState, actions){
    switch(actions.type){
        
        case SET_TOKEN: {
            return {
                token: actions.payload.token,
                ...state
            }
        }

        case SET_STATION_ID: {
            return {
                ...state,
                stationID: actions.payload
            }
        }

        case SET_STATION_NAME: {
            return {
                ...state,
                StationName: actions.payload
            }
        }

        default:{ 
            return state;
        }
    }
}