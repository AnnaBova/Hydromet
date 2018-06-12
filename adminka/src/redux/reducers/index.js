import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { AuthorizationReducer } from './AuthorizationReducer';
import { reducer as formReducer } from 'redux-form'
import { climateReducer } from './climateRecords';
import { hydrometrical_bulletinReducer } from './Hydrometrical_bulletin';

export default combineReducers({
  router: routerReducer,
  authorization: AuthorizationReducer,
  form: formReducer,
  climateRecords: climateReducer,
  hydrometeorolog_bulletin: hydrometrical_bulletinReducer,
});