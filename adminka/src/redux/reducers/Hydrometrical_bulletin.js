import {
    GET_BULLETIN, 
    CHANGE_DAY, 
    EDIT_DAY,
    CHANGE_WEATHER_OBL,
    CHANGE_WEATHER_CITY,
    CHANGE_TEXT_WEATHER_OBL,
    CHANGE_TEXT_WEATHER_CITY,
    CHANGE_OBSERV_DAY,
    EDIT_OBSERV_DAY,
    SET_CLIMATE_DATA,
    SET_WEATHER_OBSERVABLE_DATA,
    SET_HYDRO_BULLETIN_MESSAGE
} from '../actions/ActionTypes';


const initialState = {
    WeatherObl: [],
    TextWeatherObl: [],
    WeatherCity: [],
    TextWeatherCity: [],
    SelectWeathers: [],
    WeatherDay: {},
    WeatherObservable: [],
    ClimateData: {},
    ObservDay: {},
    WeatherObservableData: {},
    Message: false
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
                WeatherObservable: actions.payload.WeatheObservable.StationWeather,
                ObservDay: actions.payload.WeatheObservable.StationWeather[0],
            }
        }
        case SET_WEATHER_OBSERVABLE_DATA: {
            return {
                ...state,
                WeatherObservableData: actions.payload,
                Message: false,
            }
        }
        case SET_CLIMATE_DATA : {
            return {
                ...state,
                ClimateData: actions.payload,
                Message: false,
            }
        }
        case CHANGE_DAY: {
            return {
                ...state,
                WeatherDay: state.SelectWeathers[actions.payload],
                Message: false,
            }
        }
        case CHANGE_WEATHER_OBL: {
            return {
                ...state,
                SelectWeathers: state.WeatherObl,
                WeatherDay: state.WeatherObl[0],
                Message: false,
            }
        }
        case CHANGE_WEATHER_CITY: {
            return {
                ...state,
                SelectWeathers: state.WeatherCity,
                WeatherDay: state.WeatherCity[0],
                Message: false,
            }
        }
        case CHANGE_TEXT_WEATHER_OBL: {
            return {
                ...state,
                SelectWeathers: state.TextWeatherObl,
                WeatherDay: state.TextWeatherObl[0],
                Message: false,
            }
        }
        case CHANGE_TEXT_WEATHER_CITY: {
            return {
                ...state,
                SelectWeathers: state.TextWeatherCity,
                WeatherDay: state.TextWeatherCity[0],
                Message: false,
            }
        }
        case CHANGE_OBSERV_DAY: {
            return {
                ...state,
                ObservDay: state.WeatherObservable[actions.payload],
                Message: false,
            }
        }
        case EDIT_OBSERV_DAY: {
            return {
                ...state,
                WeatherObservable: [...state.WeatherObservable.map(item => {
                    if(item.Station === actions.payload.Station){
                        item = actions.payload;
                    }
                    return item;
                })],
                Message: true,
                ObservDay: actions.payload,
            }
            
        }
        case SET_HYDRO_BULLETIN_MESSAGE: {
            return {
                ...state,
                Message:false,
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
                Message: true,
                WeatherDay: actions.payload,
            }
        }
        default:{
            return state;
        }
    }
}