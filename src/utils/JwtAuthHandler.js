import axios from "axios";
import CConfig from "./CConfig";
import { reactLocalStorage } from "reactjs-localstorage";

class JwtAuthHandler {
  static login(username, password, callback) {
    axios
      .post(CConfig.loginUrl, { username: username, password: password })
      .then(function (response) {
        if (response.status === 200) {
          reactLocalStorage.set("token", response.data.access);
          reactLocalStorage.set("refresh", response.data.refresh);
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
    if (reactLocalStorage.get("token") && reactLocalStorage.get("refresh")) {
      return true;
    } else {
      return false;
    }
  }

  static getLoginToken() {
    return reactLocalStorage.get("token");
  }

  static getRefreshToken() {
    return reactLocalStorage.get("refresh");
  }

  static logoutUser() {
  //  console.log('logout user .. ');
    reactLocalStorage.remove("token");
    reactLocalStorage.remove("refresh");
  }

  // this part logic refer from github hackstarsj 
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
