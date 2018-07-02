import { 
    SET_TOKEN,
    SET_STATION_ID, 
    SET_STATION_NAME, 
    NO_AUTHORIZATION_MESSAGE,
} from '../actions/ActionTypes';

const initialState = {
    token: "",
    stationId:"",
    StationName: "",
    Message: false,
}

export function AuthorizationReducer(state = initialState, actions){
    switch(actions.type){
        
        case SET_TOKEN: {
            return {
                ...state,               
                token: actions.payload.token,
                Message: false,
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

        case NO_AUTHORIZATION_MESSAGE: {
            return {
                ...state,
                Message: true
            }
        }


        default:{ 
            return state;
        }
    }
}