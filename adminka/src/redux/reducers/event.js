import { GET_EVENTS, DELETE_EVENT } from '../actions/ActionTypes';

const initialState = {
    Events: []
}

export function EventReducer(state = initialState, actions) {
    switch(actions.type){
        case GET_EVENTS: {
            return {
                ...state,
                Events: actions.payload,
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