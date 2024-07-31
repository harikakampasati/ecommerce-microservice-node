var DataTypes = require("sequelize").DataTypes;
var _Carts = require("./Carts");
var _Products = require("./Products");

function initModels(sequelize) {
  var Carts = _Carts(sequelize, DataTypes);
  var Products = _Products(sequelize, DataTypes);


  return {
    Carts,
    Products,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
