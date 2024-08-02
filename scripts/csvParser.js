const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser');
const db = require("../models/index");
const { upsertRow } = require("../models/dataModel");


const CSV_FILE_PATH = path.join(__dirname, 'Products.csv');

const validateRow = (row) => {
  const {name, description, price } = row;
  if (!name || !description || !price) {
    return false;
  }
  return true;
};

const upsertProduct = async (productData) => {
    console.log("productData===>", productData)

  const {name, description, price } = productData;

  try {
    // const product = await getSingleRow(db.Products, where);
    // return await upsertRow(db.Carts, cartData);


    await upsertRow(db.Products,{
      name,
      description,
      price
    });
    console.log(`Product ${name} UPSERTED successfully.`);
  } catch (error) {
    console.error(`Error UPSERTING product ${name}:`, error);
  }
};

const parseAndUpsert = async () => {
  try {
    fs.createReadStream(CSV_FILE_PATH)
      .pipe(csvParser())
      .on('data', async (row) => {
        if (validateRow(row)) {
          await upsertProduct(row);
        } else {
          console.warn('Invalid row:', row);
        }
      })
      .on('end', () => {
        console.log('CSV file successfully processed.');
      });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

parseAndUpsert();
