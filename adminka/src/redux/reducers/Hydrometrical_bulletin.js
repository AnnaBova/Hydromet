import { 
    GET_BULLETIN, 
    CHANGE_DAY, 
    EDIT_DAY,
    CHANGE_WEATHER_OBL,
    CHANGE_WEATHER_CITY,
    CHANGE_TEXT_WEATHER_OBL,
    CHANGE_TEXT_WEATHER_CITY 
} from '../actions/ActionTypes';


const initialState = {
    WeatherObl: [],
    TextWeatherObl: [],
    WeatherCity: [],
    TextWeatherCity: [],
    SelectWeathers: [],
    WeatherDay: {}
}

export function hydrometrical_bulletinReducer(state=initialState, actions){
    switch(actions.type){
        case GET_BULLETIN: {
            return {
                ...state,
                SelectWeathers: actions.payload.WeatherCity,
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
                WeatherDay: state.SelectWeathers[actions.payload]
            }
        }
        case CHANGE_WEATHER_OBL: {
            return {
                ...state,
                SelectWeathers: state.WeatherObl,
                WeatherDay: state.WeatherObl[0]
            }
        }
        case CHANGE_WEATHER_CITY: {
            return {
                ...state,
                SelectWeathers: state.WeatherCity,
                WeatherDay: state.WeatherCity[0]
            }
        }
        case CHANGE_TEXT_WEATHER_OBL: {
            return {
                ...state,
                SelectWeathers: state.TextWeatherObl,
                WeatherDay: state.TextWeatherObl[0]
            }
        }
        case CHANGE_TEXT_WEATHER_CITY: {
            return {
                ...state,
                SelectWeathers: state.TextWeatherCity,
                WeatherDay: state.TextWeatherCity[0]
            }
        }
        case EDIT_DAY: {
            return {
                ...state,
                SelectWeathers: state.SelectWeathers.map((item)=> {
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