import Main from './src/views/Main';
import {Provider} from 'react-redux';
import React from 'react';
import {store} from './src/store';

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
