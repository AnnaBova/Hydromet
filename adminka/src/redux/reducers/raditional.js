import { SET_RADITIONAL,
         EDIT_RADITIONAL,
         CHANGE_STATION_RADITIONAL,
         UPDATE_RADIATION } from '../actions/ActionTypes';

const initialState = {
    raditionalData: [],
    raditional: {}
}

export function RaditionalReducer(state = initialState, actions){
    switch(actions.type){
        case SET_RADITIONAL: {
            return {
                ...state,
                raditionalData: actions.payload,
                raditional:  actions.payload[0]
            }
        }
        case CHANGE_STATION_RADITIONAL: {
            return {
                ...state,
                raditional: state.raditionalData[actions.payload]
            }
        }
        case EDIT_RADITIONAL: {
            return {
                ...state,
                raditional: actions.payload,
                raditionalData: state.raditionalData.map(item => {
                    if(item._id === actions.payload._id){
                        item = actions.payload;
                    }
                    return item;
                })
            }
        }
        case UPDATE_RADIATION: {
          return {
            ...state,
            raditional:actions.payload
          }
        }
        default: {
            return state;
        }
    }
}
