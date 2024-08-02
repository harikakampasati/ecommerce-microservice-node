const errorCodes = require("../helpers/errorCodes");

const getSingleRow = async (model, where, order) => {
    try {
        const data = await model.findOne({
            where,
            order,
        });
        return data;
    } catch (err) {
        err.error_code = errorCodes.SEQUELIZE_ERROR;
        throw err;
    }
};

const getDataList = async (model, where, order) => {
    try {
        const data = await model.findAll({
            where,
            order: order
        });
        return data;
    } catch (err) {
        err.error_code = errorCodes.SEQUELIZE_ERROR;
        throw err;
    }
}

const getDataBasedOnQuery = async (model, queryData) => {
    try {
        const data = await model.query(queryData.query, {
            replacements: queryData.replacements,
            type: model.QueryTypes.SELECT
        });
        return data;
    } catch (err) {
        err.error_code = errorCodes.SEQUELIZE_ERROR;
        throw err;
    }
};

const updateRow = async (model, values, options) => {
    try {
        const result = await model.update(values, options);
        if (result[0] === 1) { 
            const updatedRow = await model.findOne({
                where: options.where,
                attributes: ['mobileNumber'] 
            });
            return updatedRow.dataValues;
        } else {
            return null;
        }
    } catch (err) {
        err.error_code = errorCodes.SEQUELIZE_ERROR;
        throw err;
    }
};

const upsertRow = async (model, data) => {
    const result = await model.upsert(data)
    return result[0].dataValues;
}

const updateData = async (data) => {
    try {
        if (data) {
            return data.save(); 
        }
    } catch (error) {
        console.error("Error in updateData:", error);
        throw error;
    }
}

const deleteRow = async (data) => {
    console.log("hellllllllllppppp",data)
    try {
        if (data) {
            return data.destroy();
        }
    } catch (error) {
        console.error("Error in deleteRow:", error);
        throw error;
    }
}

module.exports = {
    getSingleRow,
    getDataList,
    getDataBasedOnQuery,
    updateRow,
    upsertRow,
    updateData,
    deleteRow
}