import React from 'react';
import { Provider } from 'react-redux';

import store from '../redux';

import GoogleMap from './GoogleMap';
import TaskCreator from './TaskCreator';
import TasksList from './TasksList';

import '../assets/styles/App.css';


function App() {
  return (
    <Provider store={store} >
      <div className="App">
        <TaskCreator />
        <GoogleMap />
        <TasksList />
      </div>
    </Provider>
  );
}

export default App;
