import {
    GET_EVENTS,
    DELETE_EVENT,
    SET_EVENT_MESSAGE_TRUE,
    SET_EVENT_MESSAGE_FALSE,
    SET_UPDATING_EVENT,
    UPDATE_SELECTED_EVENT
} from '../actions/ActionTypes';

const initialState = {
    Events: [],
    updatingEvent: {},
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
        case SET_UPDATING_EVENT:
        return {
          ...state,
          updatingEvent: state.Events[actions.payload]
        }
        case UPDATE_SELECTED_EVENT:
        return {
          ...state,
          updatingEvent:{
            ...state.updatingEvent,
            [actions.payload.name]: actions.payload.value
          }
        }
        default:  return state;
    }
}
