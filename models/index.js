const path = require("path")
const fs = require("fs");
const { Sequelize } = require("sequelize");
const config = require("../config/config")[process.env.NODE_ENV || "development"];
const basename = path.basename(__filename);
function buildConnection() {
	const dbUsername = process.env.POSTGRESS_DB_USER || config.username;
	const dbPassword = process.env.POSTGRESS_DB_PASSWORD || config.password;;
    const db = {};
    const database = process.env.POSTGRESS_DB_NAME || config.database;
    const dbPath = config 
    db[database] = new Sequelize(database, dbUsername, dbPassword, dbPath)
    fs
        .readdirSync(`${__dirname}/ecommerce_db`)
        .filter((file) => (file.indexOf(".") !== 0)
            && (file !== basename)
            && (file.slice(-3) === ".js"))
        .forEach((file) => {
            const model = require(path.join(`${__dirname}/ecommerce_db`, file))(db[database], Sequelize.DataTypes);
			db.ecommerce_db[model.name] = model;
		});
    Object.keys(db)
        .forEach((dbName) => {
            Object.keys(db[dbName])
                .forEach((modelName)=> {
                    if (db[dbName][modelName].associate) {
						db[dbName][modelName].associate(db[dbName]);
					}
                })

        })
    return  db
}
buildConnection()

