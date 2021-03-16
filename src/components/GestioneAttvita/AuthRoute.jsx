import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthenticationService from '../GestioneAttvita/services/AuthService.js';

export default class AuthRouter extends Component {

    render(){
            if (AuthenticationService.isLogged() === true)
            {
                return <Route {...this.props}></Route>
            }
            else
            {
                return <Redirect to="/"></Redirect>
            }
    }
}