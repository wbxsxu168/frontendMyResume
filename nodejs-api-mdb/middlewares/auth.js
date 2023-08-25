import pkg from 'jsonwebtoken';
const { verify } = pkg;
//import Users from "../models/users.js";
import appLog from "../util/appLog.js";
import err_codes from "../util/err_code.json" assert { type: "json" };
const { env } = process;

export const verifyJWT = (req, resp, next) => {
  try {
    const authHeader = req.header("Authorization");  // Using httpOnly cookie is suggested..  
    if(authHeader == null) {
        appLog.error("Parse JWT token from HTTP header failure, access denied!");
        return resp.status(401).json({ message: err_codes.Identity.MissingJWT });
    }
    const token =  authHeader.split('Bearer ')[1];
    const verified = verify(token, env.JWT_SECRET);
    if (!verified)
      return resp.status(401).json({ message: err_codes.Identity.InvalidJWT });
    /*       to be tuned here
      // jwt.verify(token, env.JWT_SECRET, (err, decoded_data) => { } )
      // This lookup can help in immediate logout instead of waiting access token to be expired,
      // but it need add mechanism to enhance lookup performance
      
      const existing_user = Users.findOne({username: username}); // checking whether the user still existed in db, active or deactivated, locked or not.
      if(!existing_user){
          appLog.error("user not found with the provided access token!");
          return resp.status(401).json({ message: err_codes.COMMON.error.general_one });
      } 
      */
    next();
  } catch (err) {
    appLog.error("Parsing JWT token faced runtime exception as : "+err);
    resp.status(500)
        .json({ error: err_codes.COMMON.error.general_one });
  }
};
