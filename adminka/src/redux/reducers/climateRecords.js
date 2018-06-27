import { GET_CLIMATE_RECORDS, CHANGE_RECORDS, EDIT_RECORD } from '../actions/ActionTypes';

const initialState = {
    Tables:[],
    Record: {
    }
}

export function climateReducer(state = initialState, actions){
    switch(actions.type){
        case GET_CLIMATE_RECORDS: {
            return {
                Tables: actions.payload,
                Record: actions.payload[0]
            }
        }
        case CHANGE_RECORDS: {
            return{ 
                ...state,
                Record: state.Tables.find(el => el.id == actions.payload)
            }
        }
        case EDIT_RECORD:{
            return {
                Tables: state.Tables.map((item) => {
                    if(item._id === actions.payload._id){
                        item = actions.payload;
                    }
                    return item
                }),
                Record : actions.payload
            }
        }
        default:{ 
            return state;
        }
    }
}