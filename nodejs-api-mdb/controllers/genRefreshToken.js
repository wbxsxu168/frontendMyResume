import jwt from "jsonwebtoken";
import Users from "../models/users.js";
import appLog from "../util/appLog.js";
import err_codes from "../util/err_code.json" assert { type: "json" };
const { env } = process;
// api request: refresh: "eyJ
// api response: {    "access": "xx","refresh": "eyJxxx" }

export const refreshToken = async (req, resp) => {
    try {
        const refreshTkn = req.body.refresh;
        if(!refreshTkn){
            appLog.error("Parse refresh token  from api request body is failure!");
            return resp.status(401).json({ message: err_codes.Identity.MissingRefreshJWT} );
        } 
        jwt.verify(refreshTkn, env.REFRESH_JWT_SECRET, (err, decoded_data) => {
            if(err) {
                appLog.error("RefreshToken verification failure with error: ", err);
                return resp.status(401).json({ message: err_codes.Identity.InvalidJWT });
            }
            // to be added logic in dealing with the decoded_data verification
        });

        const user = await Users.findOne({refresh_token: refreshTkn}); // to be tuned by lookup with the 3rd dot part(signature only) to improve performance
        if(!user){
            appLog.error("user not found with the provided refreshToken!");
            return resp.status(403).json({ message: err_codes.COMMON.error.general_one });
        } 
        const { _id: userID, username, email,isAccountLocked,isAccountActive } = user;
        if( isAccountLocked || !isAccountActive ) {  // based on account's latest status 
            return resp.status(401).json({
                message: err_codes.COMMON.error.general_one
            });
        }
        const accessToken = jwt.sign({userID, username, email}, env.JWT_SECRET, {
            expiresIn: env.JWT_EXPIRATION,
        });
        const new_refreshToken = jwt.sign({userID, username, email}, env.REFRESH_JWT_SECRET, {
            expiresIn: env.REFRESH_JWT_EXPIRATION,
        });
        await Users.updateOne({_id: userID}, {
            $set: {
                refresh_token: new_refreshToken
            }
        });
        appLog.success("Refresh Token had been successfully generated!");
        return resp.json({ 
            "access":   accessToken,
            "refresh":  new_refreshToken
        })
    } catch (error) {
        appLog.error("Runtime exception as: " + error);
        return resp.status(500).json({
            message: err_codes.COMMON.error.general_one
        })
    }
}