import {
    GET_CLIMATE_RECORDS,
    CHANGE_RECORDS,
    EDIT_RECORD,
    SET_CLIMATE_RECORD_MESSAGE_TRUE,
    SET_CLIMATE_RECORD_MESSAGE_FALSE,
    SET_STATION_PHOTOS
} from '../actions/ActionTypes';

const initialState = {
    Tables:[],
    Record: {
    },
    Message: false,
    photos: []
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
                // eslint-disable-next-line
                Record: state.Tables.find(el => el.id == actions.payload)
            }
        }
        case SET_CLIMATE_RECORD_MESSAGE_TRUE: {
            return {
                ...state,
                Message: true
            }
        }
        case SET_CLIMATE_RECORD_MESSAGE_FALSE : {
            return {
                ...state,
                Message: false
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
        case SET_STATION_PHOTOS:
          return {
            ...state,
            photos: actions.payload
          }
        default:{
            return state;
        }
    }
}
