// import model
import db from "../models/index.js";

// Image upload
import multer from "multer";
import path from "path";

// create a model
const Product = db.products;
const Review = db.reviews;

const addProduct = async (req, res) => {
  // console.log(req.body); // Log dữ liệu đầu vào để kiểm tra
  let info = {
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };
  const product = await Product.create(info);
  res.status(200).send(product);
  console.log(product);
};

const getProduct = async (req, res) => {
  let id = req.params.id;
  let product = await Product.findOne({ where: { id: id } });
  res.status(200).send(product);
};

const getAllProducts = async (req, res) => {
  let products = await Product.findAll({});
  res.status(200).send(products);
};

const updateProduct = async (req, res) => {
  let id = req.params.id;
  await Product.update(req.body, { where: { id: id } });
  res.status(200).send("upade product successfully !");
};

const deleteProduct = async (req, res) => {
  let id = req.params.id;
  await Product.destroy({ where: { id: id } });
  res.status(200).send("product deleted successfully !");
};

export { addProduct, getAllProducts, getProduct, deleteProduct, updateProduct };
