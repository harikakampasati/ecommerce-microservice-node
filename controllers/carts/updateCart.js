const {getSingleRow , updateData, deleteRow} = require("../../models/dataModel");
const { getResponseObject } = require("../../helpers/supporter");
const { db } = require("../../models/index");
const MAX_QUANTITY = process.env.MAX_QUANTITY || 10;

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

const updateCartItem = async (userId, productId,quantity) => {
    try{
        const where =  { userId, productId };
        let cartItem =  await getSingleRow(db.Carts, where);
        if(cartItem){
            if(cartItem.quantity === 0) {
                const deleteData = await deleteRow(cartItem);
                return null
            }
            else{
                cartItem.quantity = quantity;
                const result = await updateData(cartItem);
                return result
            }
           
        }
    }
    catch (error) {
        console.error("Error in updateCartItem:", error); 
        throw error; 
    } 
}

module.exports.updateCart = async (req, res, next) => {
    try {
        const response = getResponseObject();
        const userId = req.user.id; 
        const productId = req.body.product_id;
        const { quantity } = req.body;
        const product = await getProduct(productId);
        if (!product) {
            response.message = "Product not found";
            return res.status(404).json(response);
        }
        if (quantity <= 0) {
            response.message = "Invalid quantity";
            return res.status(400).json(response);
        }
        if (quantity > MAX_QUANTITY) {
            response.message = `Maximum cart size exceeded: max ${MAX_QUANTITY} items allowed.`;
            return res.status(400).json(response);
        }
        const cartItem = await updateCartItem(userId, productId, quantity);
        if(!cartItem){
            response.message = "The product you're trying to update is not in your cart."
            return res.status(400).json(response);
        }
        response.message = "The product was added to your cart successfully"
        return res.status(200).json(response);
    }
    catch(error){
        console.log("Error caught in addToCart:", error);
        next(error);
    }
}