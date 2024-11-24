import express from "express";
import {
  getHomepage,
  createUser,
  editUserPage,
  UpdateUser,
  deleteUser,
} from "../controllers/homeController.js";

const route = express.Router();

route.get("/", getHomepage);

route.get("/abc", (req, res) => {
  res.send("Hello World abccde !");
});

route.post("/create", createUser);
route.get("/detail/:id", editUserPage);
route.post("/update-student/:id", UpdateUser);
route.post("/delete-student/:id", deleteUser);
export default route;
