import {
    SET_TOKEN,
    SET_STATION_ID,
    SET_STATION_NAME,
    GET_CLIMATE_RECORDS,
    CHANGE_RECORDS,
    EDIT_RECORD,
    SAVE_RECORD,
    GET_PHENOMENA,
    GET_BULLETIN,
    CHANGE_DAY,
    EDIT_DAY,
    CHANGE_WEATHER_OBL,
    CHANGE_WEATHER_CITY,
    CHANGE_TEXT_WEATHER_OBL,
    CHANGE_TEXT_WEATHER_CITY,
    CHANGE_OBSERV_DAY,
    GET_AIR_POLLUTION,
    CHANGE_MATTER,
    EDIT_MATTER,
    GET_REGULAR_OBSERVABLE,
    EDIT_REGULAR_OBSERVABLE,
    GET_EVENTS,
    DELETE_EVENT,
    EDIT_OBSERV_DAY,
    SET_CLIMATE_DATA,
    SET_WEATHER_OBSERVABLE_DATA,
    SET_EMAIL,
    SET_EMAIL_ROLE,
    DELETE_EMAIL_ADDRES,
    ADD_EMAIL,
    SET_RADITIONAL,
    EDIT_RADITIONAL,
    CHANGE_STATION_RADITIONAL,
    GET_CLIMATE_CHARACTERISTIC,
    EDIT_CLIMATE_CHARACTERISTIC,
    NO_AUTHORIZATION_MESSAGE,
    SET_HYDROMET_MESSAGE,
    SET_CLIMATE_RECORD_MESSAGE_TRUE,
    SET_CLIMATE_RECORD_MESSAGE_FALSE,
    SET_EVENT_MESSAGE_TRUE,
    SET_EVENT_MESSAGE_FALSE,
    SET_STATION_PHOTO,
    UPDATE_WEATHER_CITY,
    UPDATE_WEATHER_OBL,
    UPDATE_WEATHER_CITY_TEXT,
    UPDATE_WEATHER_OBL_TEXT,
    UPDATE_DATE,
    SET_CURRENT_WEATHER,
    SET_TIME_GAPS,
    CHANGE_SELECTED_GAP,
    CHANGE_RIVER,
    CHANGE_REGULAR_OBSERVABLE,
    UPDATE_REGULAR_OBSERVABLE,
    UPDATE_WATTER_TEMPERATURE,
    SET_STATION_PHOTOS,
    SET_DECADE_BULLETING,
    UPDATE_RADIATION,
    UPDATE_CLIMATE_DATA,
    UPDATE_OBSERV_DATA_STATION,
    UPDATE_OBSERV_DATA,
    EDIT_POLLUTION_VALUE,
    SET_UPDATING_EVENT,
    UPDATE_SELECTED_EVENT,
    SET_HYDROLOGY_MESSAGE
} from './ActionTypes';
import { push } from 'react-router-redux';

// const LocalHost = "http://77.120.123.202:3001";
const LocalHost = "http://localhost:3001";

export function setEventMessageTrue(){
    return {
        type: SET_EVENT_MESSAGE_TRUE
    }
}

export function setEventMessageFalse(){
    return {
        type: SET_EVENT_MESSAGE_FALSE
    }
}


export function setRecordMessageTrue(){
    return {
        type: SET_CLIMATE_RECORD_MESSAGE_TRUE
    }
}

export function setRecordMessageFalse(){
    return {
        type: SET_CLIMATE_RECORD_MESSAGE_FALSE
    }
}

export function NoAthorizationMessage(){
    return {
        type: NO_AUTHORIZATION_MESSAGE
    }
}

export function EditClimateCharacteristicReqest(data){
    return (dispatch) => {
        fetch(`${LocalHost}/edit_climate_records`, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({ data: data})
        })
            .then(res => dispatch(EditClimateCharacteristic(data)))
            .catch(err => console.log(err));
    }
}

export function EditClimateCharacteristic(data){
    return {
        type: EDIT_CLIMATE_CHARACTERISTIC,
        payload: data
    }
}

export function GetClimateCharacteristic(){
    return (dispatch) => {
        fetch(`${LocalHost}/get_climate_characteristic`)
            .then(res => res.json())
            .then(res => dispatch(SetClimateCharacteristik(res)))
            .catch(err => console.log(err));
    }
}

export function SetClimateCharacteristik(data){
    return {
        type: GET_CLIMATE_CHARACTERISTIC,
        payload: data
    }
}

export function EditRadiotional(value){
    return {
        type: EDIT_RADITIONAL,
        payload: value
    }
}

export function EditRaditionalReqest(data){
    return (dispatch)=> {
        fetch(`${LocalHost}/edit_radionatial`,{
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(data)
        })
            .then(res => dispatch(EditRadiotional(data)))
            .catch(err => console.log(err));
    }
}

export function ChangeStationRaditional(station){
    return {
        type: CHANGE_STATION_RADITIONAL,
        payload: station
    }
}

export function SetRaditional(value){
    return {
        type:SET_RADITIONAL,
        payload: value
    }
}

export function GetRaditional() {
    return dispatch => {
        fetch(`${LocalHost}/get_radionatial`)
        .then(res => res.json())
        .then(res => dispatch(SetRaditional(res)))
        .catch(err => console.log(err));
    }
}

export function SubmitEmail(emails){
    return (dispatch) => {
        fetch(`${LocalHost}/send_mail`, {
            method: 'POST',
            headers: { 'Contetn-type': 'application/json' },
            body: JSON.stringify(emails)
        })
            .then(res => {})
            .then(err => console.log(err));
    }
}
export function SubmitDangerPhenomen(text){
    return (dispatch) => {
        fetch(`${LocalHost}/give_submit_danger`, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({text: text})
        })
            .then(res => {})
            .catch(err => console.log(err));
    }
}

export function AddEmailRequest(obj){
    return (dispatch) => {
        fetch(`${LocalHost}/add_email`, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(obj)
        })
            .then(res => res.json())
            .then(res => dispatch(AddEmail(res)))
            .catch(err => console.log(err));
    }
}

export function AddEmail(obj){
    return {
        type: ADD_EMAIL,
        payload: obj
    }
}

export function DeleteEmailRequest(obj){
    return (dispatch) => {
        fetch(`${LocalHost}/delete_email`, {
            method: 'POST',
            headers: {'Conten-type': 'application/json'},
            body: JSON.stringify(obj)
        })
            .then(res => dispatch(DeleteEmails(obj)))
            .catch(err => console.log(err));
    }
}

export function DeleteEmails(obj){
    return {
        type: DELETE_EMAIL_ADDRES,
        payload: obj
    }
}

export function SetRole(obj){
    return {
        type: SET_EMAIL_ROLE,
        payload: obj
    }
}

export function GetEmails(){
    return (dispatch) => {
        fetch(`${LocalHost}/get_email_addres`)
            .then(res => res.json())
            .then(res => dispatch(SetEmail(res)))
            .catch(err => console.log(err));
    }
}

export function SetEmail(value){
    return {
        type : SET_EMAIL,
        payload: value
    }
}

export function getWeatherObserv() {
    return (dispatch) => {
        fetch(`${LocalHost}/get_observvable_weather`)
            .then(res=> res.json())
            .then(res => dispatch(SetWeatherObservable(res)))
            .catch(err => console.log(err));
    }
}

export function SetWeatherObservable (data) {
    return {
        type: SET_WEATHER_OBSERVABLE_DATA,
        payload: data
    }
}

export function getClimateData() {
    return (dispatch) => {
        fetch(`${LocalHost}/get_climate_data`)
        .then(res=> res.json())
        .then(res => dispatch(SetCLimateData(res)))
        .catch(err => console.log(err));
    }
}

export function SetCLimateData(data){
    return {
         type:SET_CLIMATE_DATA,
         payload: data
    }
}

export function ChangeRegularObservable(value){
    return {
        type: CHANGE_REGULAR_OBSERVABLE,
        payload: value
    }
}

export function SetEditRegularObservable(value){
    return {
        type: EDIT_REGULAR_OBSERVABLE,
        payload: value
    }
}

export function EditRegularObservable(value){
    return (dispatch) => {
        fetch(`${LocalHost}/edit_regular_observable`, {
            method: 'POST',
            headers: { 'Content-type':'application/json' },
            body: JSON.stringify(value)
        })
        .then(res => dispatch(SetEditRegularObservable(value)))
        .then(()=> dispatch(getRegularObservable()))
        .catch(err => console.log(err));
    }
}

export function setRegularObservable(value){
    return {
        type: GET_REGULAR_OBSERVABLE,
        payload: value
    }
}

export function getRegularObservable(){
    return (dispatch) => {
        fetch(`${LocalHost}/get_regular_observable`)
        .then(res => res.json())
        .then(res => dispatch(setRegularObservable(res)))
        .catch(err => console.log(err));
        fetch(`${LocalHost}/gydrology_danger`)
        .then(res => res.json())
        .then(res => dispatch(setGydrolocialMessage(res.text)))
        .catch(err => {
          if(err){
            console.log(err.message);
          }
        });
    }
}

export function AirPollution(value) {
    return {
        type: GET_AIR_POLLUTION,
        payload: value
    }
}

export function getAirPollution() {
    return (dispatch) => {
        fetch(`${LocalHost}/air_pollution_api`)
        .then(res => res.json())
        .then(res => dispatch(AirPollution(res)))
        .catch(err => console.log(err));
    }
}

export function postEditMatter(value){
    return (dispatch) => {
        fetch(`${LocalHost}/edit_air_pollution`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(value)
        })
        .then(res => dispatch(editMatter(value)))
        .then(() => dispatch({type: 'SET_AIR_POLLUTION_MESSAGE', payload: true}))
        .catch(err => console.log(err));
    }
}

export function ChangeMatter(value) {
    return {
        type: CHANGE_MATTER,
        payload: value
    }
}

export function editMatter(value) {
    return {
        type: EDIT_MATTER,
        payload: value
    }
}

export function getHydroBulletin (index = 0){
    return (dispatch) => {
        fetch(`${LocalHost}/get_hydrometeorologycal_bulletin`)
        .then(res => res.json())
        .then(res => dispatch(setBulletin(res)))
        .then(() => dispatch(ChangeWeathers(index)))
        .catch(err => console.log(err));
    }
}

export function EditDay(obj){
    return {
        type: EDIT_DAY,
        payload: obj
    }
}

export function GiveDecadeBulletin(value){
    return (dispatch) => {
        fetch(`${LocalHost}/give_decad_bulletin`, {
            method: 'POST',
            headers: {
                'Content-type': 'text/plain',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body:  value
        })
            .then(res => {})
            .catch(err => console.log(err));
    }
}

export function ChangeWeathers(value){
    switch(value){
        case 0: {
            return {
                type: CHANGE_WEATHER_CITY
            };
        }
        case 1: {
            return {
                type: CHANGE_TEXT_WEATHER_CITY
            };
        }
        case 2:{
            return {
                type: CHANGE_WEATHER_OBL
            };
        }
        case 3: {
            return {
                type: CHANGE_TEXT_WEATHER_OBL
            };
        }
        default: {
            return {};
        }
    }
}

export function GiveWeatherObservable(value){
    return (dispatch)=> {
        console.log(value);
        fetch(`${LocalHost}/give_weather_observable_api`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(value)
        })
        .then(res => {
          dispatch(SetWeatherObservable(value))
        })
        .catch(err => console.log(err));
    }
}

export function SetEvents(value) {
    return {
        type: GET_EVENTS,
        payload: value
    }
}

export function uploadCaruselImage(file, station){
    let data = new FormData();
    data.append('file', file);
    data.append('station', station);

    return (dispatch) => {
        fetch(`${LocalHost}/files_carusel`, {
                method: 'POST',
                body: data
            })
            .then(response => dispatch(GetStationPhotos(station)))
            .catch(error => console.log(error));
    };
}

export function uploadDocumentRequest({file, title, text, date, description}) {
    let data = new FormData();
    data.append('file', file);
    data.append('title', title);
    data.append('text', text);
    data.append('date', date);
    data.append('description', description);

    return (dispatch) => {
      fetch(`${LocalHost}/files`, {
            method: 'POST',
            body: data
        })
        .then(response => {})
        .catch(error => console.log(error));
    };
}

export function getEvents () {
    return (dispatch) => {
        fetch(`${LocalHost}/get_events`)
            .then(res => res.json())
            .then(res => dispatch(SetEvents(res)))
            .catch(err => console.log(err));
    }
}

export function deleteEvent(value) {
    return {
        type: DELETE_EVENT,
        payload: value,
    }
}

export function DeleteEvent (value) {
    return (dispatch) => {
        fetch(`${LocalHost}/delete_event`, {
            method: "POST",
            headers: {'Contetn-type': 'text/plain'},
            body: value
        })
        .then(res => dispatch(deleteEvent(value)))
        .catch(err => console.log(err));
    }
}

export function ChangeObservDay(number){
    return{
        type : CHANGE_OBSERV_DAY,
        payload: number
    }
}

export function EditDayObserv(value){
    return {
        type: EDIT_OBSERV_DAY,
        payload: value
    }
}

export function GiveClimateData(value){
    return (dispatch)=> {
        fetch(`${LocalHost}/give_climate_date`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(value)
        })
        .then(res => dispatch(SetCLimateData(value)))
        .catch(res => console.log(res));
    }
}

export function Edit(data, index){
    return (dispatch) => {
        fetch(`${LocalHost}/edit_weather_city_buletttin`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({data, index})
        })
        .then(() => dispatch(getHydroBulletin(index)))
        .catch(err => console.log(err));
    }
}

export function SetHydrometMessage(){
    return {
        type: SET_HYDROMET_MESSAGE
    }
}

export function setBulletin(data){
    return {
        type: GET_BULLETIN,
        payload: data
    }
}

export function ChangeDay(value){
    return {
        type: CHANGE_DAY,
        payload: value,
    }
}

export function setTimeGaps(arr) {
  return {
    type: SET_TIME_GAPS,
    payload: arr
  }
}

export function getTimeGaps() {
  return dispatch => {
    fetch(`${LocalHost}/get_gaps`, {
      method: 'GET'
    })
    .then(res => res.json())
    .then(res => {
      dispatch(setTimeGaps(res))
      // dispatch(push('/meteostation'));
    })
  }
}

export function setWeather(arr) {
  return {
    type: SET_CURRENT_WEATHER,
    payload: arr
  }
}

export function getWeather(stationId) {
  return dispatch => {
    fetch(`${LocalHost}/get_station_weather/${stationId}`, {
      method: 'GET'
    })
    .then(res => res.json())
    .then(res => {
      dispatch(setWeather(res));
      dispatch(getWaterTemperature());
      dispatch(getTimeGaps());
    })
  }
}

export function getToken(data){
    return (dispatch) => {
        fetch(`${LocalHost}/token`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json'},
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => { localStorage.setItem('token', res.token); return res;})
            .then(res => {
                dispatch(setToken(res));
                return res;
            })
            .then((res) => {
                switch(res.role){
                    case 1:{
                        dispatch(setStationId(res.stationID));
                        dispatch(getWeather(res.stationID));
                        dispatch(push('/meteostation'));
                        break;
                    }
                    case 2: {
                        dispatch(setStationId(res.stationID));
                        dispatch(push('/all_meteostation'))
                        break;
                    }
                    case 3: {
                        dispatch(push('/climate_records'));
                        break;
                    }
                    case 4: {
                        dispatch(push('/hydrometeorologycal_bulletin'));
                        break;
                    }
                    case 5: {
                        dispatch(push('/air_pollution'));
                        break;
                    }
                    default: {
                        dispatch(push('/signin'))
                    }
                }

            })
            .catch(err => dispatch(NoAthorizationMessage()));
    }
}

export function getPhenomena() {
    return (dispatch) => {
        fetch(`${LocalHost}/get_phenomena`)
        .then(res => res.json())
        .then(res => dispatch(setClimateRecords(res)))
        .catch(err => console.log(err));
    }
}

export function setPhenomena(value){
    return {
        type: GET_PHENOMENA,
        payload: value,
    }
}

export function SaveRecords(Records){
    return (dispatch) => {
        fetch(`${LocalHost}/save_records`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(Records)
        })
        .then(res => res.json())
        .then(res => dispatch({type: SAVE_RECORD, payload:res}))
        .catch(err => console.log(err));
    }
}

export function SavePhenomena(Phenomena){
    return (dispatch) => {
        fetch(`${LocalHost}/save_Phenomena`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(Phenomena)
        })
        .then(res => res.json())
        .then(res => dispatch({type: SAVE_RECORD, payload:res}))
        .catch(err => console.log(err));
    }
}

export function EditRecord(value){
    return {
        type: EDIT_RECORD,
        payload: value
    }
}

export function ChangeRecords(value){
    return {
        type: CHANGE_RECORDS,
        payload: value
    }
}

export function GetClimateRecords() {
    return (dispatch) => {
        fetch(`${LocalHost}/get_climate_records`)
        .then(res => res.json())
        .then(res => dispatch(setClimateRecords(res)))
        .catch(err => console.log(err));
    }
}

export function setClimateRecords(data){
    return {
        type: GET_CLIMATE_RECORDS,
        payload: data
    }
}

export function AddWeather(weather){
    return (dispatch) => {
        fetch(`${LocalHost}/addweather`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(weather)
        })
        .then(res => {})
        .catch(err => console.log(err));
    }
}

export function AddWeatherStation(obj){
    return (dispatch) => {
        fetch(`${LocalHost}/add_weather_station`, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(obj)
        })
        .then(res => {})
        .catch(err => console.log(err))
    }
}

export function getStationId(station){
    return (dispatch) => {
        fetch(`${LocalHost}/get_station_id`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({station:station})
        })
        .then(res => res.json())
        .then(res => {
          dispatch(setStationId(res._id))
          return res;
        })
        .then(res => dispatch(getWeather(res._id)))
        .then(res => dispatch(getTimeGaps()))
        .then(() => dispatch(setStationName(station)))
        .catch(err => console.log(err));
    }
}

export function getStation() {
    return (dispatch) => {
    fetch(`${LocalHost}/station`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
        .then(res => res.json())
        .then(res => {
            dispatch(setStationId(res._id));
            dispatch(getWeather(res._id));
            dispatch(getWaterTemperature());
            dispatch(getTimeGaps());
            dispatch(setStationName(res.Title));
            dispatch(setStationPhoto(res.photo));
            dispatch(setToken(localStorage.getItem('token')));
        })
        .catch(err => console.log(err));
    }
}

export function setToken(token){
    return {
        type: SET_TOKEN,
        payload: token
    }
}

export function setStationId(id){
    return {
        type: SET_STATION_ID,
        payload: id
    }
}

export function setStationName(name){
    return {
        type: SET_STATION_NAME,
        payload:name
    }
}

export function setStationPhoto(photo){
    return{
        type: SET_STATION_PHOTO,
        payload: photo
    }
}

export function updateCity({index, item}){
    return{
        type: UPDATE_WEATHER_CITY,
        payload: {
          item,
          index
        }
    }
}

export function updateObl({index, item}){
    return{
        type: UPDATE_WEATHER_OBL,
        payload: {
          item,
          index
        }
    }
}

export function updateDate({city, obl, textCity, textObl}){
    return{
        type: UPDATE_DATE,
        payload: {
          city,
          obl,
          textCity,
          textObl
        }
    }
}

export function UpdateDate({city, obl, textCity, textObl}){
  return (dispatch) => dispatch(updateDate({city, obl, textCity, textObl}))
}

export function UpdateWeatherCity(item, index) {
    return (dispatch) => dispatch(updateCity({item, index}))
}

export function UpdateWeatherObl(item, index) {
    return (dispatch) => dispatch(updateObl({item, index}))
}

export function updateOblText({index, item}){
    return{
        type: UPDATE_WEATHER_OBL_TEXT,
        payload: {
          item,
          index
        }
    }
}

export function updateCityText({index, item}){
    return{
        type: UPDATE_WEATHER_CITY_TEXT,
        payload: {
          item,
          index
        }
    }
}

export function UpdateWeatherCityText(item, index) {
    return (dispatch) => dispatch(updateCityText({item, index}))
}

export function UpdateWeatherOblText(item, index) {
    return (dispatch) => dispatch(updateOblText({item, index}))
}

export function changeSelectedGap(newGap) {
  return {
    type: CHANGE_SELECTED_GAP,
    payload: newGap
  }
}

export function ChangeSelectedGap(newGap) {
  return dispatch => dispatch(changeSelectedGap(newGap));
}

export function ChangeRiver(newRiver) {
    return (dispatch) => dispatch(changeRiver(newRiver))
}

export function changeRiver(newRiver) {
    return {
        type: CHANGE_RIVER,
        payload: newRiver
    }
}

export function UpdateRegularObservable(value) {
    return (dispatch) => dispatch(updateRegularObservable(value))
}

export function updateRegularObservable(value) {
    return {
        type: UPDATE_REGULAR_OBSERVABLE,
        payload: value
    }
}

export function getWaterTemperature(){
  return (dispatch) => {
      fetch(`${LocalHost}/water`)
      .then(res => res.json())
      .then(res => dispatch(setWater(res)))
      .catch(err => console.log(err));
  }
}

export function SetWaterTemperature(data){
  return (dispatch) => fetch(`${LocalHost}/water`, {
      method: 'POST',
      headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(res => dispatch(setWater(res)));
}

export function setWater(data){
  return {
    type: UPDATE_WATTER_TEMPERATURE,
    payload: data
  }
}

export function GetStationPhotos(station){
  return (dispatch) => fetch(`${LocalHost}/photos/${station}`, {
      method: 'GET',
      headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
      }
  })
  .then(res => res.json())
  .then(res => dispatch(setStationPhotos(res)));
}

export function setStationPhotos(data){
  return {
    type: SET_STATION_PHOTOS,
    payload: data
  }
}

export function DeleteStationPhoto(station, photo){
  return (dispatch) => fetch(`${LocalHost}/photos/${station}`, {
      method: 'POST',
      headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-type': 'application/json'
      },
      body: JSON.stringify({photo})
  })
  .then(res => dispatch(GetStationPhotos(station)));
}

export function getDecadeBulletin() {
  return dispatch => fetch(`${LocalHost}/decade_bulletin_api`, {
      method: 'GET',
      headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
  })
  .then(res => res.text())
  .then(res => dispatch(setDecadeBulleting(res)))
}

export function setDecadeBulleting(bulleting) {
  return {
    type: SET_DECADE_BULLETING,
    payload: bulleting
  }
}

export function UpdateRadiation(radiation) {
  return {
    type: UPDATE_RADIATION,
    payload: radiation
  }
}

export function UpdateClimateData(data) {
  return {
    type: UPDATE_CLIMATE_DATA,
    payload: data
  }
}

export function UpdateObservDataStation(data) {
  return {
    type: UPDATE_OBSERV_DATA_STATION,
    payload: data
  }
}

export function UpdateObservData(data) {
  return {
    type: UPDATE_OBSERV_DATA,
    payload: data
  }
}

export function EditPollutionValue(matter, post, value ) {
  return {
    type: EDIT_POLLUTION_VALUE,
    payload: {
      matter,
      post,
      value
    }
  }
}

export function setUpdatingEvent(event) {
  return {
    type: SET_UPDATING_EVENT,
    payload: event
  }
}

export function updateSelectedEvent(event) {
  return {
    type: UPDATE_SELECTED_EVENT,
    payload: event
  }
}

export function requestUpdateEvent({file, title, text, date, description, _id}) {
    let data = new FormData();
    data.append('file', file);
    data.append('_id', _id);
    data.append('title', title);
    data.append('text', text);
    data.append('date', date);
    data.append('description', description);
    return (dispatch) => {
      fetch(`${LocalHost}/event`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: data
        })
        .then(response => {
          dispatch(getEvents());
        })
        .catch(error => console.log(error));
    };
}

export function setGydrolocialMessage(text) {
  return {
    type: SET_HYDROLOGY_MESSAGE,
    payload: text
  }
}
