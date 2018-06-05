import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import reducer from './reducers/index';


export const history = createHistory();

const middleware = routerMiddleware(history);

export const Store = createStore(reducer, composeWithDevTools(applyMiddleware(middleware, thunk)));