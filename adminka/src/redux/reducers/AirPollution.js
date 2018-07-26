import {
    GET_AIR_POLLUTION,
    CHANGE_MATTER,
    EDIT_MATTER,
    SET_AIR_POLLUTION_MESSAGE,
    EDIT_POLLUTION_VALUE
} from '../actions/ActionTypes';

const initialState = {
    data: [],
    matter: {

    },
    Message: false
}

export function AirPollutionReducer (state = initialState, actions){
    switch(actions.type){
        case GET_AIR_POLLUTION: {
            return {
                ...state,
                data: actions.payload,
                matter: actions.payload[0]
            }
        }
        case CHANGE_MATTER: {
            return {
                ...state,
                matter: state.data[actions.payload]
            }
        }
        case EDIT_MATTER:{
            return{
                ...state,
                data: state.data.map(item => {
                    if(item._id === actions.payload._id){
                        item = actions.payload;
                    }
                    return item;
                }),
                // Message: true
            }
        }
        case SET_AIR_POLLUTION_MESSAGE: {
            return{
                ...state,
                Message: actions.payload
            }
        }
        case EDIT_POLLUTION_VALUE:{
          const newData = state.data.map((item, index) => {
              if(index === +actions.payload.matter){
                  item.data[actions.payload.post] = actions.payload.value;
              }
              return item;
          });
          return {
            ...state,
            data: newData,
            matter: newData[+actions.payload.matter]
          }
        }
        default: {
            return state;
        }
    }
}
