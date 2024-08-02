const {getSingleRow , updateData, deleteRow} = require("../../models/dataModel");
const { getResponseObject } = require("../../helpers/supporter");
const { db } = require("../../models/index");

const getCartItem = async (productId, userId) => {
    try{
        const where =  {productId, userId};
        return getSingleRow(db.Carts, where);
    }
    catch (error) {
        console.error("Error in getCartItem:", error); 
        throw error; 
    } 
}

module.exports.deleteCart = async (req, res, next) => {
    try {
        const response = getResponseObject();
        const userId = req.user.id; 
        const productId = req.body.product_id;
        const cartItem = await getCartItem(productId,userId);
    
        if (!cartItem) {
            response.message = "The product you're trying to delete is not in your cart";
            return res.status(404).json(response);
        }
        const deleteData = await deleteRow(cartItem);
        response.message = "The product is deleted from your cart successfully"
        return res.status(200).json(response);
    }
    catch(error){
        console.log("Error caught in deleteCart:", error);
        next(error);
    }
}