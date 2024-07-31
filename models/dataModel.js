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
module.exports = {
    getSingleRow
}