import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from './store';

import './styling/styles.global.less'


import Header from './components/Header';
import './styling/styles.global.less'


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="container">
          <Header current={80000} total={100000} />
        </div>
      </Provider>
    );
  }
}

export default App;
