import { SET_TOKEN } from '../actions/ActionTypes';

const initialState = {
    token: "",
}

export function AuthorizationReducer(state = initialState, actions){
    switch(actions.type){
        
        case SET_TOKEN: {
            return {
                token: actions.payload
            }
        }

        default:{ 
            return state;
        }
    }
}