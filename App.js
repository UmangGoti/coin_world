import React from 'react';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import API, { DevelopmentMode } from './src/ApiService/APIService';
import { apiConfig } from './src/Config';
import Navigation from './src/Navigators/Navigation';
import { configureStore } from './src/Store';

const store = configureStore();
API.getInstance().build(DevelopmentMode.DEVELOPMENT, apiConfig);
LogBox.ignoreAllLogs(true);
const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
