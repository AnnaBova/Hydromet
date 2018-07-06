import {
    GET_CLIMATE_CHARACTERISTIC, 
    EDIT_CLIMATE_CHARACTERISTIC
} from '../actions/ActionTypes';

const initialState = {
    DataArr: {},
}

export function ClimateCharacteristicReducer(state = initialState, actions){
    switch(actions.type){
        case GET_CLIMATE_CHARACTERISTIC: {
            return {
                ...state,
                DataArr: actions.payload[0]
            }
        }
        case EDIT_CLIMATE_CHARACTERISTIC: {
            return {
                DataArr: actions.payload
            }
        }
        default: {
            return state;
        }
    }
}