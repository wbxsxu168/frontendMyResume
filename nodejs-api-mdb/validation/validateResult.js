import pkg5 from "express-validator";
const { validationResult } = pkg5;
import appLog from "../util/appLog.js";
import err_codes from "../util/err_code.json" assert { type: "json" };

const validateResult = (req, resp, next) => {
  try {
    validationResult(req).throw()
    if (req.body.username) {
      req.body.username = req.body.username.toLowerCase()
    }
    return next()
  } catch (err) {
    appLog.error("Sign up user-data invalid!")
    return  resp.status(400).json({
        errors: {
          message: err_codes.Identity.InvalidSignUp
        }
    })
  }
}
export default validateResult;
