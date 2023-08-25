import bcrypt from "bcrypt";
import Users from "../models/users.js";
import appLog from "../util/appLog.js";
import err_codes from "../util/err_code.json" assert { type: "json" };

export const userSignUp = async (req, res) => {
    try {
        const { username, email, password, firstname,lastname } = req.body;
        const salt = await bcrypt.genSalt();
        const hashedPWD = await bcrypt.hash(password, salt);
        const dup_user = await Users.findOne({username: username});
        
        if (dup_user) // 409 - Conflict
            return res.status(409)    
            .json({ error: err_codes.Identity.user.E11000 });
        const total_user_num = await Users.find();
        if (total_user_num.length > 1000) { // 403 - Forbidden
            return res.status(403).json({ error: err_codes.DB.MaxUserNum });
        }
        const user = await new Users({
            username,
            email,
            password: hashedPWD,
            roleIDs:"3",
            firstname,
            lastname
        });
        user.save()
            .then((usrdata) => {
                appLog.success("MongoDB save() on new user with success, the signup account has been created successfully as : " + usrdata);
                return res.status(201).json({ message: "Account sign up with success!"  }); // Prod env, remove usrdata for security reason
                //return res.status(201).json({ message: "Account sign up with success!", user_data: usrdata }); // Dev Env.
            })
            .catch((dberror) => {     
                appLog.error("MongoDB save() faced exception during user sign up process, the error is: " + dberror);
                return res.status(500).json({ message : err_codes.COMMON.error.general_one }); // from err_codes.DB.MDBCRUDERROR to err_codes.COMMON.error.general_one
            });
    } catch (error) {
        appLog.error("Run time exception during user sign up process as: " + error);
        return res.status(500).json({ message : err_codes.COMMON.error.general_one });  // for security reason, using vague string in  api return for exception reason.
    }
}