import { reactLocalStorage } from "reactjs-localstorage";

const { default: JwtAuthHandler } = require("./JwtAuthHandler");
const { default: Axios } = require("axios");
const { default: CConfig } = require("./CConfig");

class RestAPIHandler {
  async checkLogin() {
    if (JwtAuthHandler.checkTokenExpiry()) {
      try {
        var response = await Axios.post(CConfig.refreshApiUrl, {
          refresh: JwtAuthHandler.getRefreshToken(),
        });
        reactLocalStorage.set("token", response.data.access);
      } catch (error) {
        console.log(error);
        //Not Using Valid Token for Refresh then Logout the User
        JwtAuthHandler.logoutUser();
        window.location = "/";
      }
    }
  }

  async fetchHomePage() {
    await this.checkLogin();
    try { 
      var response = await Axios.get(CConfig.homeApiUrl, {
        headers: { Authorization: "Bearer " + JwtAuthHandler.getLoginToken() },
      });
      return response;
    }
    catch (error) {
      console.log(error);
    }
  
  }

  async fetchResumePage() {
    await this.checkLogin();
    try { 
      var response = await Axios.get(CConfig.resumeApiUrl, {
        headers: { Authorization: "Bearer " + JwtAuthHandler.getLoginToken() },
        responseType: 'text'
      });   
      return response;
    }
    catch (error) {
      console.log(error);
    }
 
  }  

   
  async downLdFileData(idxStr)  {
    await this.checkLogin();
    try {
        var s0=CConfig.FileDwnApiUrl;
        var s1=idxStr;
        var fdURL=`${s0}${s1}/`;
        console.log(fdURL);
        var response = await Axios.get(fdURL,  
        {
          headers: { Authorization: "Bearer " + JwtAuthHandler.getLoginToken() },
          responseType: 'blob'  
        });
        return response;  
    
      } catch (error) {
        console.error('Error downloading file:', error);
      }
  }     
}
export default RestAPIHandler;
