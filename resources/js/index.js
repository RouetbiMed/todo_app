import React from 'react'
import ReactDom from 'react-dom'

import App from './app';
import {Provider} from "react-redux";
import store from "./redux/store";
import {Router} from 'react-router-dom';
import history from "./utils/history";

ReactDom.render(
    <Provider store={store}>
        <Router history={history}>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('root')
);