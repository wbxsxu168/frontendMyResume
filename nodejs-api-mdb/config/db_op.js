import mongoose from "mongoose"
import appLog from "../util/appLog.js";
import err_codes from "../util/err_code.json" assert { type: "json" };
const { env } = process;

export const InitMDBConnection = async () => {
    try {
        mongoose.set('strictQuery', false);
        mongoose.connect(env.MONGO_URI); 
        appLog.success(err_codes.DB.MDBConnectOK);
    } catch (dberror) {
        appLog.error("Critical DB connection error: "+dberror);
        process.exit();
    }
}