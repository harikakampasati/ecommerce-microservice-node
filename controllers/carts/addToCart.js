const { upsertRow, getSingleRow } = require("../../models/dataModel");
const { getResponseObject } = require("../../helpers/supporter");
const { db } = require("../../models/index");
const MAX_QUANTITY = process.env.MAX_QUANTITY || 10;

const getUpsertData = async (db, userId, productId, quantity) => {
    try{
        const cartData = {
            userId,
            productId,
            quantity
        }
        return await upsertRow(db.Carts, cartData);
    }
    catch (error) {
        console.error("Error in getUpsertData:", error); 
        throw error; 
    }
}
const getProduct = async (productId) => {
    try{
        const where =  { id: productId };
        return getSingleRow(db.Products, where);
    }
    catch (error) {
        console.error("Error in getProduct:", error); 
        throw error; 
    } 
}

module.exports.addToCart = async (req, res, next) => {
    try {
        const response = getResponseObject();
        const userId = req.user.id;
        console.log(req.user); 
        const productId = req.body.product_id;
        const { quantity } = req.body;
        const product = await getProduct(productId);
        if (!product) {
            response.message = "The product you are trying to add to the cart does not exist";
            return res.status(404).json(response);
        }
        if (quantity <= 0) {
            response.message = "Please enter a positive quantity for the product";
            return res.status(400).json(response);
        }
        if (quantity > MAX_QUANTITY) {
            response.message = `Maximum quantity limit for this product exceeded.`;
            return res.status(400).json(response);
        }
        const upsertData = await getUpsertData(db, userId, productId, quantity);
        response.message = "Cart updated successfully";
        response.data = upsertData;
        return res.status(200).json(response);
    }
    catch(error){
        console.log("Error caught in addToCart:", error);
        next(error);
    }
}