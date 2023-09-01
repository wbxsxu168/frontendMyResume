import axios from "axios";
import CConfig from "./CConfig";
import secureLocalStorage from "react-secure-storage"; // "reactjs-localstorage" replaced;

class JwtAuthHandler {
  static login(username, password, callback) {
    axios
      .post(CConfig.loginUrl, { username: username, password: password })
      .then(function (response) {
        if (response.status === 200) {
          secureLocalStorage.setItem("token", response.data.access);
          secureLocalStorage.setItem("refresh", response.data.refresh);
          callback({ error: false, message: "Signin successfully..." });
        }
      })
      .catch(function (error1) {
        if (error1.code ==='ERR_NETWORK') {
          callback({
            error: true,
            message: "Network Error or Backend service not online...",
            });  
        }
        else {
          callback({
            error: true,
            message: "Invalid Input...",
          });
        }

      });
  }

  static isLoggedIn() {
    if (secureLocalStorage.getItem("token") && secureLocalStorage.getItem("refresh")) { 
      return true;
    } else {
      return false;
    }
  }

  static getLoginToken() {
    return secureLocalStorage.getItem("token");
  }

  static getRefreshToken() {
    return secureLocalStorage.getItem("refresh");
  }

  static logoutUser() {
  //  console.log('logout user .. ');
    secureLocalStorage.removeItem("token");
    secureLocalStorage.removeItem("refresh");
  }

  // this part logic refer from github hackstarsj 
  // need enhancing as it can not handle server side revoke token cases..
  static checkTokenExpiry() {
    var expire = false;
    var token = this.getLoginToken();
    var tokenArray = token.split(".");
    var jwt = JSON.parse(atob(tokenArray[1])); 
    if (jwt && jwt.exp && Number.isFinite(jwt.exp)) {
      expire = jwt.exp * 1000;
    } else {
      expire = false;
    }
   // console.log('check whether token expired .. ');
    if (!expire) {
      return false;
    }

    return Date.now() > expire;
  }
}

export default JwtAuthHandler;
