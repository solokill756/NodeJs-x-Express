import connection from "../config/database.js";
import {
  getAllUser,
  getUserById,
  UppdateUser,
  deleteUserInDB,
} from "../services/CRUDServices.js";
const getHomepage = async (req, res) => {
  // A simple SELECT query
  try {
    let results = await getAllUser();
    res.render("studentView", { results: results });
  } catch (err) {
    console.log(err);
  }
};

const createUser = (req, res) => {
  let { name, email, city } = req.body;
  connection.query(
    "INSERT INTO Users (name, email, city) VALUES (?, ?, ?)",
    [name, email, city],
    function (err, result) {
      if (err) {
        console.error("Error inserting user:", err);
        res.status(500).send("Error creating user.");
        return;
      }
      console.log("User created successfully:", result);
    }
  );
  res.send("Created user successfully!");
};

const editUserPage = async (req, res) => {
  let id = req.params.id;
  console.log(id);
  try {
    let findUser = await getUserById(id);
    console.log(findUser);
    if (findUser) {
      res.render("EditStudent", { findUser: findUser });
    } else {
      res.send("Cant find user!");
    }
  } catch (error) {}
};

const UpdateUser = async (req, res) => {
  try {
    console.log(req.params.id);
    let findStudent = await getUserById(req.params.id);
    if (findStudent) {
      findStudent.name = req.body.name;
      findStudent.email = req.body.email;
      findStudent.city = req.body.city;
      let results = await UppdateUser(findStudent);
      if (results) {
        return getHomepage(req, res);
      }
    } else return res.send("Cant update user!");
  } catch (error) {
    console.log(`error: ${error.message}`);
  }
};

const deleteUser = async (req, res) => {
  try {
    let id = req.params.id;
    console.log(id)
    let results = await deleteUserInDB(id);
    if (results) {
      return getHomepage(req, res);
    } else {
      return res.send("Cant delete user!");
    }
  } catch (error) {
    console.log(`error: ${error.message}`);
  }
};
// Xuất hàm dưới dạng ES Module
export { getHomepage, createUser, editUserPage, UpdateUser, deleteUser };
