
import './Navbar.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import { Avatar } from '@material-ui/core';
import { withRouter } from 'react-router';
import AuthenticationService from '../services/AuthService.js';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

class Navbar extends Component {


  render() {
   // console.log('logged', AuthenticationService.isLogged(), 'user', AuthenticationService.getUserInfo() )
    return (
      <div>
        <div className="userbar">
          <Link to="/"><div className="logo"><img src="./images/trend.svg" width="40px" alt="logo"></img></div>
          </Link>
          <UserInfo />
        </div>
        <div className="navigation">

          <ul>
            <li>
              <Link to="/da_svolgere/:userid">
                <span className="icon"><PlaylistAddIcon /></span>
                <span className="title"> Attività da completare</span>
              </Link>
            </li>
            <li>
              <Link to="/svolte/:userid">
                <span className="icon"><PlaylistAddCheckIcon /></span>
                <span className="title">Attività completate</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );

  }

}

function changeButton(e){
 
  e.target.innerText = "Login"

}

const UserInfo = () => {
  
  var datiCookies = JSON.parse(window.sessionStorage.getItem('testCookie'));
  //console.log('jsondaticookie', datiCookies)
  if (AuthenticationService.isLogged()) {
    return (
      <div className="logged">

        <span className="user">
          <h4> {datiCookies.nomeUtente} {datiCookies.cognomeUtente}</h4>
          <h6>   
          {datiCookies.ruoloUtente} 
          </h6>
        </span>

        <Avatar className="avatar" style={{ background: 'purple' }}>MB</Avatar>
        <Link onClick={(e) => {changeButton(e)}} className="btn-log"  to="/logout">
            <span className="icon"><ExitToAppIcon /></span>
            <span className="title">Logout</span>
          </Link>

      </div>
    )
  }
  else {
    return (
      <div  className="not-logged">

        <span className="user">
          <Link className="btn-log"  to="/">
            <span className="icon"><ExitToAppIcon /></span>
            <span className="title">Login</span>
          </Link>
        </span>


      </div>
    )
  }
}
export default withRouter(Navbar);

