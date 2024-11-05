import express from "express";
import { getHomepage } from "../controllers/homeController.js";

const route = express.Router();

route.get("/", getHomepage);

route.get("/abc", (req, res) => {
  res.send("Hello World abccde !");
});

export default route;
