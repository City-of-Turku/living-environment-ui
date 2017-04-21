import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {browserHistory, Router} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'

import createRoutes from './routes';
import store from './store';

const routes = createRoutes(store);
const history = syncHistoryWithStore(browserHistory, store);


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history} children={routes}/>
      </Provider>
    );
  }
}

export default App;
