const path = require("path");
const fs = require("fs");
const { Sequelize } = require("sequelize");
const config = require("../config/config")[process.env.NODE_ENV || "development"];
const basename = path.basename(__filename);
function buildConnection() {
    const dbUsername = process.env.POSTGRESS_DB_USER || config.username;
    const dbPassword = process.env.POSTGRESS_DB_PASSWORD || config.password;
    const db = {};
    const database = process.env.POSTGRESS_DB_NAME || config.database;
    const dbPath = config;
    db[database] = new Sequelize(database, dbUsername, dbPassword, dbPath);
    fs
        .readdirSync(path.join(__dirname, "ecommerce_db"))
        .filter(file => file.indexOf(".") !== 0 && file.slice(-3) === ".js")
        .forEach(file => {
            const model = require(path.join(__dirname, "ecommerce_db", file))(db[database], Sequelize.DataTypes);
            db[database][model.name] = model;
        });

    Object.keys(db[database]).forEach(modelName => {
        if (db[database][modelName].associate) {
            db[database][modelName].associate(db[database]);
        }
    });

    return db;
}

const db = buildConnection();
db.Sequelize = Sequelize;

// Explicitly add `Products` to the `db` export
module.exports = {
    db: db[process.env.POSTGRESS_DB_NAME || config.database],
    Sequelize: db.Sequelize
};
