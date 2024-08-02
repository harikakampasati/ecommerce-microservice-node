const moment = require("moment");
const { updateRow, getSingleRow } = require("../../models/dataModel");
const { getResponseObject } = require("../../helpers/supporter");
const { db } = require("../../models/index");
const OTP_EXPIRATION_MINUTES = process.env.OTP_EXPIRATION_MINUTES || 5;

const getUpdateOtpInDb = async (db, otp, otpExpiry, mobileNumber) => {
    try{
        const values = {
            otp,
            otpExpiry
        }
        const options = {
            where: {
                mobileNumber
            }
        };
        const updateResult = await updateRow(db.Users, values, options);
        return updateResult
    }
    catch (error) {
        console.error("Error in getUpdateOtpInDb:", error); 
        throw error; 
    }

}

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
}

const getUserByMobileNo = async (mobileNumber) => {
    try {
        const where = { 
            mobileNumber,
        };
        const user = await getSingleRow(db.Users, where);
        return user;
    } catch (error) {
        console.error("Error in getUserData:", error); 
        throw error; 
    }

}

module.exports.sendOtp = async (req, res, next) => {
    try {
        const response = getResponseObject();
        const mobileNumber = req.body.mobile_number;
        const user = await getUserByMobileNo(mobileNumber)
        if(!user){
            response.message = "The given Mobile number doesn't exit"
            return res.status(200).json(response);
        }

        const otp = generateOTP();
        const otpExpiry = moment().add(OTP_EXPIRATION_MINUTES, 'minutes').toDate();
        const sendOtpInDb = await getUpdateOtpInDb(db, otp, otpExpiry, mobileNumber.toString());
        if(!sendOtpInDb) {
            return res.status(200).json(response);
        }
        response.message = "OTP sent successfully"
        const otpMessage = `Your OTP for E-commerce login is ${otp} This code is valid for 5 minutes. Do not share this code with anyone.`
        response.data.otp_message = otpMessage;
        response.data.mobile_number = sendOtpInDb.mobileNumber
        return res.status(200).json(response);
    }
    catch(error){
        console.log("Error caught in sendOtp:", error);
        next(error);
    }
}