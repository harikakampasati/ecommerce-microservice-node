const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const moment = require("moment");
const { getErrorResponse } = require("./helpers/supporter")
const v1Router = require("./v1_routes/index");
const { db } = require("./models/index");


const app = express();
app.use(express.json());
const serverRestartTime = moment().format("DD-MM-YYYY hh:mm:ss");

app.use("/ecommerce/hello/", (req, res, next) => {
    res.json({
      message: `Hello World! ${process.env.NODE_ENV}`,
      last_restart_time: serverRestartTime,
    });
});

app.use("/ecommerce/v1/", v1Router);

// Error handling middleware
app.use((err, req, res, next) => {
  console.log(err);
  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";
  const errCode = err.error_code || "";
  let where = `${req.method}:${req.url}`;
  res.status(statusCode).json(getErrorResponse(message, errCode, where));

});

const PORT = process.env.PORT || 3000;



// Sync database and start server
db.sync().then(() => {
  console.log('Database & tables created!');
  app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });