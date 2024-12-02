import express from "express";
import {
  getNewToken,
  authenticateToken,
  logOut,
  register,
} from "../controllers/jwtController.js";
const route = express.Router();

route.get("/getNewToken", getNewToken);
route.get("/home", authenticateToken, (req, res) => {
  console.log(req.user.name);
  res.send(`Welcome to the my web ${req.user.name}`);
});

route.get("/logout", logOut);

route.get("/register", register);

export default route;
