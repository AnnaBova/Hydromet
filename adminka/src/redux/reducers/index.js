import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { AuthorizationReducer } from './AuthorizationReducer';

export default combineReducers({
  router: routerReducer,
  authorization: AuthorizationReducer
});