import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import modules from './modules';

import ReduxThunk from 'redux-thunk';

const store = createStore(modules, composeWithDevTools(applyMiddleware(ReduxThunk)));

export default store;