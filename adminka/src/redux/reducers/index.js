import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { AuthorizationReducer } from './AuthorizationReducer';
import { reducer as formReducer } from 'redux-form'
import { climateReducer } from './climateRecords';

export default combineReducers({
  router: routerReducer,
  authorization: AuthorizationReducer,
  form: formReducer,
  climateRecords: climateReducer,
});