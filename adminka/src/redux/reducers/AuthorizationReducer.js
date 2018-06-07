import { SET_TOKEN } from '../actions/ActionTypes';

const initialState = {
    token: "",
    role: "",
}

export function AuthorizationReducer(state = initialState, actions){
    switch(actions.type){
        
        case SET_TOKEN: {
            return {
                token: actions.payload.token,
                role: actions.payload.role,
            }
        }

        default:{ 
            return state;
        }
    }
}