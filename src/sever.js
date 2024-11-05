// Import các thư viện và mô-đun
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import configViewEngine from "./config/viewEngine.js";
import webRouters from "./routers/web.js";
import connection from "./config/database.js";
const app = express();
const hostName = process.env.HOST_NAME;
const port = process.env.PORT || 8888;

// A simple SELECT query
try {
  const [results, fields] = await connection.query("SELECT * FROM Users");

  console.log(results); // results contains rows returned by server
} catch (err) {
  console.log(err);
}

configViewEngine(app);

// Khai báo route
app.use("/", webRouters);

// Bắt đầu server
app.listen(port, hostName, () => {
  console.log(`listening on port ${port}`);
});
