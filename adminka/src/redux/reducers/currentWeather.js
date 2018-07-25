import { SET_CURRENT_WEATHER,
         SET_TIME_GAPS,
         CHANGE_SELECTED_GAP,
         UPDATE_WATTER_TEMPERATURE } from '../actions/ActionTypes.js';

const initialState =  {
    weather:[],
    gaps:[],
    waterTemperature:{
      Dnipro:{},
      Azov:{}
    }
};

export function currentWeather(state = initialState , actions){
    switch(actions.type){
        case SET_CURRENT_WEATHER:
          return {
            ...state,
            weather: actions.payload.data,
          }
        case UPDATE_WATTER_TEMPERATURE:
          return {
              ...state,
              waterTemperature: actions.payload
            };
        case SET_TIME_GAPS:
          return {
            ...state,
            gaps: actions.payload
          }
        case CHANGE_SELECTED_GAP:
          return {
            ...state,
            weather:state.weather.map((item)=>{
              if(item.TimeGapsId === actions.payload.TimeGapsId) return actions.payload;
              return item;
            })
          }
        default: {
            return state;
        }
    }
}
