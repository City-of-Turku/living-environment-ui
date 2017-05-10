import React from 'react';
import { Provider } from 'react-redux';
import { browserHistory, Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import ReactDOM from 'react-dom';

import store from './store';
import createRoutes from './routes';

const routes = createRoutes(store);
const history = syncHistoryWithStore(browserHistory, store);


const App = () => (
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>
);

ReactDOM.render(
  <App />, // eslint-disable-line react/jsx-filename-extension
  document.getElementById('root')
);

export default App;
