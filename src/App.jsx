import React from 'react';
import { Provider } from 'react-redux';
import { browserHistory, Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import store from './store';
import createRoutes from './routes'; // eslint-disable-line import/no-named-as-default

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
