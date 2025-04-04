import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import '../public/assets/css/style.css'
import '../public/assets/css/vendors/bootstrap.css'

import { HashRouter as Router} from 'react-router-dom';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
 
root.render(
    <Router>
        <App /> 
    </Router>
)