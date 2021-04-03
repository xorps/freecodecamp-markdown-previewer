import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './app';
import {createStore} from './store';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(<Provider store={createStore()}><App /></Provider>, document.getElementById('root'));