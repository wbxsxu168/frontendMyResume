import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../models/users.js";
import appLog from "../util/appLog.js";
import err_codes from "../util/err_code.json" assert { type: "json" };
const { env } = process;

export const Login = async (req, resp) => {
    try {
        const { password: reqPWD } = req.body;
        const user = await Users.findOne({ username: req.body.username });
        const pwd_match = await bcrypt.compare(reqPWD, user.password);
        if(!pwd_match){
            appLog.error(`Failure in sign-in due to the input password does not match with our records!`);
            return resp.status(401).json({
                message: err_codes.Identity.CredentialsInvalid
            });
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
        const refreshToken = jwt.sign({userID, username, email}, env.REFRESH_JWT_SECRET, {
            expiresIn: env.REFRESH_JWT_EXPIRATION,
        });
    
        await Users.updateOne({_id: userID}, {
            $set: {
                refresh_token: refreshToken
            }
        });
        appLog.success("Sign in successfully with username: "+username);
        return resp.status(200).json({         
            "access":   accessToken,
            "refresh":   refreshToken
        })
    } catch (err) {
        appLog.error(`Account with username: ${req.body.username} can not be found as: ` + err);
        return resp.status(401).json({ message : err_codes.COMMON.error.general_one });
    }
}

export const Logout = async (req, res) => {
    const refreshTkn = req.body.refresh;
    if(!refreshTkn) return res.sendStatus(204);
    const user = await Users.findOne({refresh_token: refreshTkn});
    // 204: “No Content.” This code means that the server has successfully processed the request, but is not going to return any content.
    if(!user) return res.sendStatus(204);
    const { _id: userID } = user;
    await Users.updateOne({_id: userID},{
        $set: {
            refresh_token: null
        }
    })
    appLog.success("Logout successfully! Refresh Token has been removed from the identity.");
    return res.status(200).json({
        message: err_codes.Identity.user.LogoutUser
    });
}