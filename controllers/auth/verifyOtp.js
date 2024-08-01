const moment = require("moment");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const { getSingleRow } = require("../../models/dataModel");
const { getResponseObject } = require("../../helpers/supporter");
const { db } = require("../../models/index");
const JWT_SECRET = process.env.JWT_SECRET || 'test@123';

const getUserData = async (db, mobileNumber, otp) => {
    try {
        const where = { 
            mobileNumber,
            otp,
            otpExpiry: { [Op.gt]: new Date() }

        };
        const user = await getSingleRow(db.Users, where);
        return user;
    } catch (error) {
        console.error("Error in getUserData:", error); 
        throw error; 
    }
}

module.exports.verifyOtp = async (req, res, next) => {
    try {
        const response = getResponseObject();
        const mobileNumber = req.body.mobile_number;
        const { otp } = req.body;
        const user = await getUserData(db, mobileNumber, otp);
        if(!user){
            response.message = "Invalid or expired OTP";
            return res.status(400).json(response);
        }
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
        response.message = "OTP verified successfully."
        response.data.token = token;
        return res.status(200).json(response);
    }
    catch(error){
        console.log("Error caught in verifyOtp:", error);
        next(error);
    }
}