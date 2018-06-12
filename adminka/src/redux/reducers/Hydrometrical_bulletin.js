import { GET_BULLETIN, CHANGE_DAY, EDIT_DAY } from '../actions/ActionTypes';


const initialState = {
    WeatherObl: [],
    TextWeatherObl: [],
    WeatherCity: [],
    TextWeatherCity: [],
    WeatherDay: {}
}

export function hydrometrical_bulletinReducer(state=initialState, actions){
    switch(actions.type){
        case GET_BULLETIN: {
            return {
                ...state,
                WeatherObl: actions.payload.WeatherObl,
                TextWeatherObl: actions.payload.TextWeatherObl,
                WeatherCity: actions.payload.WeatherCity,
                TextWeatherCity: actions.payload.TextWeatherCity,
                WeatherDay: actions.payload.WeatherCity[0],
            }
        }
        case CHANGE_DAY: {
            return {
                ...state,
                WeatherDay: state.WeatherCity[actions.payload]
            }
        }
        case EDIT_DAY: {
            return {
                ...state,
                WeatherCity: state.WeatherCity.map((item)=> {
                    if(item._id === actions.payload._id){
                        item = actions.payload;
                    }
                    return item;
                }),
                WeatherDay: actions.payload
            }
        }
        default:{
            return state;
        }
    }
}