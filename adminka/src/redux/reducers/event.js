import { 
    GET_EVENTS, 
    DELETE_EVENT,
    SET_EVENT_MESSAGE_TRUE,
    SET_EVENT_MESSAGE_FALSE,  
} from '../actions/ActionTypes';

const initialState = {
    Events: [],
    Message: false
}

export function EventReducer(state = initialState, actions) {
    switch(actions.type){
        case GET_EVENTS: {
            return {
                ...state,
                Events: actions.payload,
            }
        }
        case SET_EVENT_MESSAGE_TRUE: {
            return {
                ...state,
                Message: true
            }
        }
        case SET_EVENT_MESSAGE_FALSE : {
            return {
                ...state,
                Message: false
            }
        }
        case DELETE_EVENT: {
            return {
                ...state,
                Events: state.Events.filter(item => item._id !== actions.payload)
            }
        }
        default:  return state;
    }
}