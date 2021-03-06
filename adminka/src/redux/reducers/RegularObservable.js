import {
    GET_REGULAR_OBSERVABLE,
    CHANGE_REGULAR_OBSERVABLE,
    EDIT_REGULAR_OBSERVABLE,
    SET_MESSAGE_REGULAR_OBSERVABLE,
    SET_MESSAGE_REGULAR_OBSERVABLE_TRUE,
    UPDATE_REGULAR_OBSERVABLE,
    SET_HYDROLOGY_MESSAGE
} from '../actions/ActionTypes';

const initialState = {
    RegularObservable: [],
    Observ: {},
    gydrolocialMessage: '',
    Message: false
}

export function RegularObservableReducer(state=initialState, actions){
    switch(actions.type){
        case GET_REGULAR_OBSERVABLE:{
            return {
                ...state,
                RegularObservable: actions.payload,
                Observ: actions.payload[0]
            };
        }
        case CHANGE_REGULAR_OBSERVABLE:{
            return {
                ...state,
                // eslint-disable-next-line
                Observ: state.RegularObservable.find(item => item._id == actions.payload)
            };
        }
        case UPDATE_REGULAR_OBSERVABLE:{
            return {
                ...state,
                Observ: actions.payload
            };
        }
        case EDIT_REGULAR_OBSERVABLE:{
            return {
                ...state,
                RegularObservable: state.RegularObservable.map(item => {
                    // eslint-disable-next-line
                    if(item._id == actions.payload){
                        item = actions.payload;
                    }
                    return item;
                }),
                Observ: actions.payload ,
                Message: true
            };
        }
        case SET_MESSAGE_REGULAR_OBSERVABLE_TRUE: {
            return  {
                ...state,
                Message: true
            }
        }
        case SET_MESSAGE_REGULAR_OBSERVABLE: {
            return {
                ...state,
                Message: false
            }
        }
        case SET_HYDROLOGY_MESSAGE:
          return {
            ...state,
            gydrolocialMessage:actions.payload
          }
        default: {
            return state;
        }
    }
}
