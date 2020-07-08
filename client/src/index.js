
import React from 'react';
import ReactDom from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import Root from './Root';
import reducers from './reducers';

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
)

ReactDom.render(
  <Provider store = {store}>
    <Root />
  </Provider>,
  document.getElementById('root')
);

