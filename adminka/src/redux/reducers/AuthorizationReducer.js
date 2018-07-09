import { 
    SET_TOKEN,
    SET_STATION_ID, 
    SET_STATION_NAME, 
    NO_AUTHORIZATION_MESSAGE,
    SET_STATION_PHOTO,
} from '../actions/ActionTypes';

const initialState = {
    token: "",
    stationId:"",
    StationName: "",
    Message: false,
    photo: 1,
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

        case SET_STATION_PHOTO: {
            return {
                ...state,
                photo: actions.payload
            }
        }

        default:{ 
            return state;
        }
    }
}