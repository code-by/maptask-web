import React from 'react';
import ReactDOM from 'react-dom';
import redux from './redux/';

import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';


const render = () => (
  ReactDOM.render(<App />, document.getElementById('root'))
);

console.log(' *** KEY *** ', process.env);

render();
redux.subscribe(render);



serviceWorker.unregister();
