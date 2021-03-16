class AuthenticationService {

    saveUserInfo = (username, nome, cognome, ruolo) => {
        let dataCookie = `{"userid": "${username}","nomeUtente": "${nome}","cognomeUtente": "${cognome}","ruoloUtente": "${ruolo}"}`
        sessionStorage.setItem("testCookie", dataCookie);

        //console.log("session", username)
    };

    getUserInfo = () => {
        sessionStorage.getItem("testCookie");
         
    }


    clearUserInfo = () => {
        sessionStorage.removeItem("testCookie");


    };

    isLogged = () => {
        let user = sessionStorage.getItem("testCookie");
        if (user === null || user === 'undefined') {
            return false;
        } else {
            return true;
        }
    }

}


export default new AuthenticationService()