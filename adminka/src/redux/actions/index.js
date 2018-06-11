import { SET_TOKEN, SET_STATION_ID, SET_STATION_NAME, GET_CLIMATE_RECORDS, CHANGE_RECORDS, EDIT_RECORD, SAVE_RECORD, GET_PHENOMENA } from './ActionTypes';
import { push } from 'react-router-redux';

const LocalHost = 'http://localhost:3001'

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