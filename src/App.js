import React, { Component } from 'react';
import { Provider } from 'react-redux';

import TaskLandingPage from './components/TaskLandingPage';
import store from './store';

import './styling/styles.global.less'


import Header from './components/Header';
import SideBar from './components/SideBar';
import './styling/styles.global.less'
import styles from './App.less';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className={styles.root}>
          <div className={styles.sideBarWrapper}>
            <SideBar />
          </div>
          <div className={styles.contentWrapper}>
            <Header current={80000} total={100000}/>
            <TaskLandingPage />
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
