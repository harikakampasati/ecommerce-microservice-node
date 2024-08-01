const errorCodes = require("../helpers/errorCodes");

const getSingleRow = async (model, where, order) => {
    try {
        const data = await model.findOne({
            where,
            order,
            raw: true
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


module.exports = {
    getSingleRow,
    getDataList,
    getDataBasedOnQuery,
    updateRow
}