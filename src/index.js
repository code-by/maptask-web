import React from 'react';
import ReactDOM from 'react-dom';
import redux from './redux/';

import App from './views/App';
import './index.css';
import * as serviceWorker from './serviceWorker';


const render = () => (
  ReactDOM.render(<App />, document.getElementById('root'))
);

render();
redux.subscribe(render);



serviceWorker.unregister();
