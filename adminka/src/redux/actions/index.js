import { SET_TOKEN } from './ActionTypes';
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
            .then(res => dispatch(setToken(res)))
            .then(() => dispatch(push('/')))
            .catch(err => console.log(err));
    }
}

export function setToken(token){
    return {
        type: SET_TOKEN,
        payload: token
    }
}