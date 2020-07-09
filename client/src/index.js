
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';

import Root from './Root';
import store from './store';


ReactDom.render(
  <Provider store = {store}>
    <Root />
  </Provider>,
  document.getElementById('root')
);

