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
    CHANGE_TEXT_WEATHER_CITY
} from './ActionTypes';
import { push } from 'react-router-redux';

const LocalHost = 'http://localhost:3001'

export function getHydroBulletin (){
    return (dispatch) => {
        fetch(`${LocalHost}/get_hydrometeorologycal_bulletin`)
        .then(res => res.json())
        .then(res => dispatch(setBulletin(res)))
        .catch(err => console.log(err));
    }
}

export function EditDay(obj){
    return {
        type: EDIT_DAY,
        payload: obj
    }
}


export function ChangeWeathers(value){
    if(value == 0){
        return {
            type: CHANGE_WEATHER_CITY
        }
    }
    if(value == 1){
        return {
            type: CHANGE_TEXT_WEATHER_CITY
        }
    }
    if(value == 2){
        return {
            type: CHANGE_WEATHER_OBL
        }
    }
    if(value == 3){
        return {
            type: CHANGE_TEXT_WEATHER_OBL
        }
    }
}

export function GiveWeatherObservable(value){
    return (dispatch)=> {
        fetch(`${LocalHost}/give_weather_observable`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json'},
            body: JSON.stringify(value) 
        })
        .then(res => {})
        .catch(err => console.log(err));
    }
}

export function uploadDocumentRequest({ file, name }) {  
    let data = new FormData();
    data.append('file', document);
    data.append('name', name);
  
    return (dispatch) => {
      fetch('/files', {
            method: 'POST',
            headers: { 'Content-type': 'multipart/form-data'},
            body: JSON.stringify(value) 
        })
        .then(response => dispatch(uploadSuccess(response))
        .catch(error => dispatch(uploadFail(error));
    };
  }

export function GiveClimateData(value){
    return (dispatch)=> {
        fetch(`${LocalHost}/give_climate_date`, { 
            method: 'POST',
            headers: { 'Content-type': 'application/json'},
            body: JSON.stringify(value) 
        })
        .then(res => console.log(res))
        .catch(res => console.log(res));
    }
}

export function Edit(data, index){
    return (dispatch) => {
        fetch(`${LocalHost}/edit_weather_city_buletttin`, {
            method: 'POST',
            headers: { 
                'Content-type': 'application/json'
            },
            body: JSON.stringify({data, index}) 
        })
        .then(res => res.json())
        .then(EditDay(data))
        .catch(err => console.log(err));
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
                        dispatch(push('/meteostation'))
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
                    default: {
                        dispatch(push('/signin'))
                    }
                }
                
            })
            .catch(err => console.log(err));
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
            headers: { 'Content-type': 'application/json'},
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
            headers: { 'Content-type': 'application/json'},
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
        .then(res => {
            console.log(res)
        })
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
            dispatch(setStationName(res.Title));
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