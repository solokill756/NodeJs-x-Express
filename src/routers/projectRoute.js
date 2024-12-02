import express from "express";
import {
  updateProduct,
  addProduct,
  getAllProducts,
  deleteProduct,
  getProduct,
} from "../controllers/projectController.js";

const route = express.Router();

route.post("/add", addProduct);
route.get("/get/:id", getProduct);
route.delete("/delete/:id", deleteProduct);
route.put("/update/:id", updateProduct);
route.get("/getAll", getAllProducts);

export default route;
