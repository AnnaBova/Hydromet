import { SET_EMAIL, SET_EMAIL_ROLE, DELETE_EMAIL_ADDRES, ADD_EMAIL } from '../actions/ActionTypes';

const initialState = {
    Emails: []
}

export function emailReducer(state = initialState , actions){
    switch(actions.type){
        case SET_EMAIL: {
            return {
                ...state,
                Emails: actions.payload
            }
        }
        case SET_EMAIL_ROLE: {
            return {
                ...state,
                Emails: state.Emails.map(item => {
                    if(item._id === actions.payload._id){
                        item = actions.payload;
                    }
                    return item;
                })
            }
        }
        case ADD_EMAIL : {
            return {
                ...state,
                Emails: [...state.Emails, actions.payload]
            }
        }
        case DELETE_EMAIL_ADDRES: {
            return {
                ...state,
                Emails: state.Emails.filter(item => item._id !== actions.payload._id)
            }
        }
        default: {
            return state;
        }
    }
}