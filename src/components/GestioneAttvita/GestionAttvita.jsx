
import React, { Component } from 'react';
import './GestioneAttivita.css';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Da_svolgere from '../GestioneAttvita/da_svolgere/Da_svolgere';
import Svolte from '../GestioneAttvita/svolte/Svolte';
import PageNotFound from '../GestioneAttvita/pageNotFound/PageNotFound';
import Paper from '@material-ui/core/Paper';
import { Avatar, Button, Grid, TextField } from '@material-ui/core';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Alert from '@material-ui/lab/Alert';
import Navbar from '../GestioneAttvita/navbar/Navbar';
import AuthenticationService from '../GestioneAttvita/services/AuthService.js'
import  AuthRouter  from '../GestioneAttvita/AuthRoute'
import LogoutComponent from './logout/LogoutComponent';
 

export default class GestioneAttvita extends Component {

    render() {
        return (

            <Router>
                <div>
                    <Navbar></Navbar>
                    <div className="main">
                        <Switch>

                            <Route exact path="/" component={LoginComponent} />
                            <Route exact path="/logout" component={LogoutComponent} />
                            <AuthRouter path="/da_svolgere/:userid" component={Da_svolgere} />
                            <AuthRouter path="/svolte/:userid" component={Svolte} />
                            <Route component={PageNotFound} />

                        </Switch>
                    </div>
                </div>

            </Router>

        )
    }
}

class LoginComponent extends Component {

    state = {
        nomeutente: "Mario",
        cognomeutente: "Bianchi",
        ruolo: "admin",
        userid: "admin",
        password: "admin",
        isConnesso: null

    }



    render() {
        const paperStyle = { padding: '20px', height: '70vh', width: '400px', margin: '20px auto' };
        const avatarStyle = { background: "red" };
        return (
            <div>
                <Grid container style={{ minHeight: '100vh' }}>
                    <Paper elevation={10} style={paperStyle}>
                        <Avatar style={avatarStyle} padding={20}> <LockOpenIcon /></Avatar>
                        <Grid container alignItems="center" direction="column" item xs={12} sm={12} style={{ padding: 10 }}>
                            <div>

                                <Grid container alignItems="baseline" alignContent="space-between" justify="center" style={{ padding: 10 }}>

                                    <div />
                                    <div> <h1>Esercizio React.js + GraphQL + Material UI</h1> </div>
                                </Grid>
                                <div> <h4>Login</h4></div>
                                <TextField label="Username" name="userid" placeholder="Inserisci Username" type="text" fullWidth required margin="normal" value={this.state.userid} onChange={this.GestioneModificaLabel}> </TextField>
                                <TextField label="Password" name="password" placeholder="Inserisci Password" type="password" fullWidth required margin="normal" value={this.state.password} onChange={this.GestioneModificaLabel}></TextField>
                                <FormControlLabel
                                    control={
                                        <Checkbox

                                            name="checkedB"
                                            color="primary"
                                        />
                                    }
                                    label="Resta connesso"
                                />
                                <Button onClick={this.Login} type="subimit" color="primary" variant="contained" fullWidth > Accedi</Button>
                            </div>
                        </Grid>
                        <Grid alignItems="flex-end" container item xs={12} sm={6} style={{ padding: 10 }}>
                            <p> username: admin</p> <br></br>
                            <p> password: admin</p>
                        </Grid>
                        <MsgConnessioneOk isConnesso={this.state.isConnesso} />
                        <MsgErrore isConnesso={this.state.isConnesso} />
                    </Paper>
                </Grid>

            </div>
        )
    }

    Login = () => {

        if (this.state.userid === "admin" && this.state.password === "admin") {
            AuthenticationService.saveUserInfo(this.state.userid, this.state.nomeutente, this.state.cognomeutente, this.state.ruolo);
            this.props.history.push(`/da_svolgere/${this.state.userid}`)

            this.setState({ isConnesso: true })
        } else {
            console.log("false")
            this.setState({ isConnesso: false })
        }
        console.log("Login clicked", this.state.userid, this.state.password, this.state.isConnesso);

    }

    GestioneModificaLabel = (event) => {
        this.setState(
            {
             [event.target.name]: event.target.value
            }
        )
    }

}


function MsgConnessioneOk(props) {
    if (props.isConnesso) {
        return <Alert severity="success">Connesione Ok</Alert>
    }

    return null
}


function MsgErrore(props) {
    if (props.isConnesso === false) {
        return <Alert severity="error">Username o  password errati</Alert>
    }

    return null
}