import React from 'react';
import ReactDOM from 'react-dom';

import styles from './styles/styles.css';
import App from './components/App.jsx';
import { getInstance } from './stores/'

const store = getInstance();

const render = () => {
  ReactDOM.render(<App/>, document.getElementById('root'));
};

store.subscribe(render);
render();