const {getSingleRow} = require("../../models/dataModel");
const { getResponseObject } = require("../../helpers/supporter");
const { db } = require("../../models/index");

const getData = async (db, productId) => {
    const where = { id: productId };
    try {
        const result = await getSingleRow(db.Products, where);
        return result;
    } catch (error) {
        console.error("Error in getData:", error); 
        throw error; 
    }
}

module.exports.getProductById = async (req, res, next) => {
    try {
        const productId = req.query.product_id;
        const response = getResponseObject();
        response.data = await getData(db, productId);
        return res.status(200).json(response);
    }catch (error) {
        console.log("Error caught in getProductById:", error);
        next(error);
    }
};