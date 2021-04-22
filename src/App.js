import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.less';

import Workspace from './pages/index.js'
import Login from './pages/login/index'

function App() {
    return (
        <div className="App">
            <BrowserRouter >
                <Switch>
                    <Route path="/login" component={props => <Login {...props} />}>
                    </Route>
                    <Route path="/" component={props => <Workspace {...props} />}>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
