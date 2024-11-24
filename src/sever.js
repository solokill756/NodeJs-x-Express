// Import các thư viện và mô-đun
import dotenv from "dotenv";
import express from "express";
import configViewEngine from "./config/viewEngine.js";
import webRouters from "./routers/web.js";
import connection from "./config/database.js";
const app = express();
const hostName = process.env.HOST_NAME;
const port = process.env.PORT || 8888;
dotenv.config();

// config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

configViewEngine(app);

// Khai báo route
app.use("/", webRouters);

// Bắt đầu server
app.listen(port, hostName, () => {
  console.log(`listening on port ${port}`);
});
