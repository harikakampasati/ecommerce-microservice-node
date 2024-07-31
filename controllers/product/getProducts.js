const { getDataList, getDataBasedOnQuery } = require("../../models/dataModel");
const { getResponseObject } = require("../../helpers/supporter");
const { db } = require("../../models/index");

const getData = async(db, search) => {
    try {
        const order = [['createdAt', 'DESC']];
        if(search){
            const queryData = {
                query: `
                    SELECT * FROM "Products"
                    WHERE name % :search
                    ORDER BY "createdAt" DESC;
                  `,
                replacements: {
                    search
                },
              };
              const products = await getDataBasedOnQuery(db, queryData);
              return products;
        }
        else{
            const products = await getDataList(db.Products, {}, order)
            return products;
        }
        
    } catch (error) {
        console.error("Error in getData:", error); 
        throw error; 
    }
}

module.exports.getProducts = async (req, res, next) => {
    try {
        const response = getResponseObject();
        const { search } = req.query;
        response.data = await getData(db, search);
        return res.status(200).json(response);
    }
    catch(error){
        console.log("Error caught in getProducts:", error);
        next(error);
    }
}