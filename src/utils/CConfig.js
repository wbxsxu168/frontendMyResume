class CConfig {
    //for Prod:  xxxxxxx
    //FOR LOCAL Debugging URLs
    static baseUrl = "http://localhost:8080/";
    
    static loginUrl = this.baseUrl+"api/token/";
    static refreshApiUrl =this.baseUrl+"api/token/refresh/";
    static homeApiUrl   = this.baseUrl+"api/v1/";    
    static resumeApiUrl = this.baseUrl+"api/h1xxxxxxxx/";
    static FileDwnApiUrl = this.baseUrl+"api/fileDwnldxxxxxx/";

    static baseStatUrl = this.baseUrl+"static/public_xxxxxxx/";
    static contactPgeUrl =this.baseStatUrl+"contact.html";    
    static PPolicyPgeUrl =this.baseStatUrl+"ppolicy.html";    
    static ToUPgeUrl  =   this.baseStatUrl+"termofuse.html";    
    static myImgUrl   =   this.baseStatUrl+"play_soccer2.png";
     
    static homeUrl = "./home";
    static logoutPageUrl = "/logout"; 
  }
  
  export default CConfig;
  