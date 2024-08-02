const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Carts', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id'
      },
      unique: "Carts_userId_productId_key"
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Products',
        key: 'id'
      },
      unique: "Carts_userId_productId_key"
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Carts',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "Carts_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "Carts_userId_productId_key",
        unique: true,
        fields: [
          { name: "userId" },
          { name: "productId" },
        ]
      },
    ]
  });
};
