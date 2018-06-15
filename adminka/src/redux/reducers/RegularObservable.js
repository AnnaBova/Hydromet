import {
    GET_REGULAR_OBSERVABLE,
    CHANGE_REGULAR_OBSERVABLE,
    EDIT_REGULAR_OBSERVABLE
} from '../actions/ActionTypes';

const initialState = {
    RegularObservable: [],
    Observ: {}
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
                Observ: state.RegularObservable[actions.payload]
            };
        }
        case EDIT_REGULAR_OBSERVABLE:{
            return {
                ...state,
                RegularObservable: state.RegularObservable.map(item => {
                    if(item._id === actions.payload){
                        item = actions.payload;
                    }
                    return item;
                }),
                Observ: actions.payload 
            };
        }
        default: {
            return state;
        }
    }
}