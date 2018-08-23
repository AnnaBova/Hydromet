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
    SET_HYDRO_BULLETIN_MESSAGE,
    SET_HYDROMET_MESSAGE,
    UPDATE_WEATHER_OBL,
    UPDATE_WEATHER_CITY,
    UPDATE_WEATHER_OBL_TEXT,
    UPDATE_WEATHER_CITY_TEXT,
    UPDATE_DATE,
    SET_DECADE_BULLETING,
    UPDATE_CLIMATE_DATA,
    UPDATE_OBSERV_DATA_STATION,
    UPDATE_OBSERV_DATA,
    UPDATE_AZOV_TEXT,
    GET_REPORT_INFO,
    UPDATE_REPORT_INFO,
    UPDATE_WEATHER_REPORT
} from '../actions/ActionTypes';

const initialState = {
    WeatherObl: [],
    TextWeatherObl: [],
    WeatherCity: [],
    TextWeatherCity: [],
    OriginDate: '',
    SelectWeathers: [],
    WeatherDay: {},
    WeatherObservable: [],
    ClimateData: {},
    ObservDay: {},
    decadeBulletin: '',
    WeatherObservableData: {},
    Message: false,
    Report: {
        AzovText: '',
        TextWeather: '',
    }
}

export function hydrometrical_bulletinReducer(state=initialState, actions){
    switch(actions.type){
        case GET_BULLETIN: {
            return {
                ...state,
                SelectWeathers: actions.payload.WeatherCity,
                WeatherObl: actions.payload.WeatherObl,
                WeatherOblOrigin: JSON.parse(JSON.stringify(actions.payload.WeatherObl)),
                TextWeatherObl: actions.payload.TextWeatherObl,
                TextWeatherOblOrigin: JSON.parse(JSON.stringify(actions.payload.TextWeatherObl)),
                WeatherCity: actions.payload.WeatherCity,
                WeatherCityOrigin: JSON.parse(JSON.stringify(actions.payload.WeatherCity)),
                TextWeatherCity: actions.payload.TextWeatherCity,
                TextWeatherCityOrigin: JSON.parse(JSON.stringify(actions.payload.TextWeatherCity)),
                ObservDay: actions.payload.WeatheObservable.StationWeather[0],
            }
        }
        case UPDATE_REPORT_INFO: {
            return {
                ...state,
                Report: actions.payload,
            }
        }
        case SET_HYDROMET_MESSAGE: {
            return {
                ...state,
                Message: true,
            }
        }
        case GET_REPORT_INFO: {
            return {
                ...state,
                Report: actions.payload,
            }
        }
        case SET_WEATHER_OBSERVABLE_DATA: {
            return {
                ...state,
                WeatherObservableData: actions.payload,
            }
        }
        case SET_CLIMATE_DATA : {
            return {
                ...state,
                ClimateData: actions.payload,
            }
        }
        case CHANGE_DAY: {
            return {
                ...state,
                WeatherDay: state.SelectWeathers[actions.payload],
            }
        }
        case CHANGE_WEATHER_OBL: {
            return {
                ...state,
                SelectWeathers: state.WeatherObl,
                WeatherDay: state.WeatherObl[0],
            }
        }
        case CHANGE_WEATHER_CITY: {
            return {
                ...state,
                SelectWeathers: state.WeatherCity,
                WeatherDay: state.WeatherCity[0],
            }
        }
        case CHANGE_TEXT_WEATHER_OBL: {
            return {
                ...state,
                SelectWeathers: state.TextWeatherObl,
                WeatherDay: state.TextWeatherObl[0],
            }
        }
        case CHANGE_TEXT_WEATHER_CITY: {
            return {
                ...state,
                SelectWeathers: state.TextWeatherCity,
                WeatherDay: state.TextWeatherCity[0],
            }
        }
        case CHANGE_OBSERV_DAY: {
            return {
                ...state,
                ObservDay: state.WeatherObservable[actions.payload],
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
        case UPDATE_WEATHER_CITY: {
            return {
                ...state,
                WeatherCity: state.WeatherCity.map((item, index)=> {
                    if(index === actions.payload.index) return actions.payload.item;
                    return item;
                })
            }
        }
        case UPDATE_WEATHER_OBL: {
            return {
                ...state,
                WeatherObl: state.WeatherObl.map((item, index)=> {
                    if(index === actions.payload.index) return actions.payload.item;
                    return item;
                })
            }
        }
        case UPDATE_WEATHER_CITY_TEXT: {
            return {
                ...state,
                TextWeatherCity: state.TextWeatherCity.map((item, index)=> {
                    if(index === actions.payload.index) return actions.payload.item;
                    return item;
                })
            }
        }
        case UPDATE_WEATHER_OBL_TEXT: {
            return {
                ...state,
                TextWeatherObl: state.TextWeatherObl.map((item, index)=> {
                    if(index === actions.payload.index) return actions.payload.item;
                    return item;
                })
            }
        }
        case UPDATE_DATE: {
          return {
              ...state,
              WeatherCity: actions.payload.city,
              WeatherObl: actions.payload.obl,
              TextWeatherCity: actions.payload.textCity,
              TextWeatherObl: actions.payload.textObl,
          }
        }
        case SET_DECADE_BULLETING:
          return {
            ...state,
            decadeBulletin: actions.payload
          }
        case UPDATE_CLIMATE_DATA:
          return {
            ...state,
            ClimateData: actions.payload
          }
        case UPDATE_OBSERV_DATA:
          return {
            ...state,
            WeatherObservableData:{
              ...state.WeatherObservableData,
              [actions.payload.name]:actions.payload.value
            }
          }
        case UPDATE_OBSERV_DATA_STATION:
          return {
            ...state,
            WeatherObservableData:{
              ...state.WeatherObservableData,
              StationWeather: state.WeatherObservableData.StationWeather.map((item, index)=> {
                  if(index === actions.payload.index){
                    return {
                      ...item,
                      [actions.payload.obj.name]:actions.payload.obj.value
                    }
                  }
                  return item;
              })
            }
          }
        case UPDATE_AZOV_TEXT: 
          return {
              ...state,
              Report: {
                  ...state.Report,
                  AzovText: actions.payload,
              }
          }
        case UPDATE_WEATHER_REPORT:
          return {
              ...state,
              Report: {
                  ...state.Report,
                  TextWeather:actions.payload
              }
          }
        default:{
            return state;
        }
    }
}
