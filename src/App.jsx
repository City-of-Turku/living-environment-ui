import React from 'react';
import { Provider } from 'react-redux';
import { browserHistory, Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import store from './store';
import createRoutes from './routes';

// Array.prototype.find polyfill
require('array.prototype.find').shim();

const routes = createRoutes(store);
const history = syncHistoryWithStore(browserHistory, store);


const App = () => (
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>
);

export default App;
