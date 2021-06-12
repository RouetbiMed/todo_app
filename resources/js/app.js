import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import SignInPage from './pages/auth/SignInPage';
import SignUpPage from './pages/auth/SignUpPage';

export default function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/">
                        <SignInPage/>
                    </Route>
                    <Route exact path="/register">
                        <SignUpPage/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}