import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import {jest, test, beforeAll, afterAll} from '@jest/globals';
import store from './store';
import App from './App';


// Mock console.error to not show this warning:
// Warning: [react-router] Location "/test-slug" did not match any routes
const originalConsoleError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
});

test('renders App with mocked URL', () => {
  const history = createMemoryHistory();
  history.push('/test-slug');

  render(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  );
});
