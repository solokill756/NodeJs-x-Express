import dotenv from "dotenv";
import express from "express";
const app = express();
const hostName = process.env.HOST_NAME;
import route from "./routers/jwtRoute.js";
dotenv.config();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/jwt", route);

app.listen(port, hostName, () => {
  console.log(`listening on port ${port}`);
});
