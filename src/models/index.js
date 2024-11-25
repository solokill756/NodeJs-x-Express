import { Sequelize, DataTypes } from "sequelize";
import connection from "../config/database.js";

const sequelize = new Sequelize(
  connection.DB,
  connection.USER,
  connection.PASSWORD,
  {
    host: connection.HOST,
    dialect: connection.dialect,
    port: connection.PORT,
    pool: {
      max: connection.pool.max,
      min: connection.pool.min,
      acquire: connection.pool.acquire,
      idle: connection.pool.idle,
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to the database successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Sử dụng dynamic import để import các mô hình
await (async () => {
  db.products = (await import("./productModel.js")).default(
    sequelize,
    DataTypes
  );
  db.reviews = (await import("./reviewModel.js")).default(sequelize, DataTypes);

  db.sequelize.sync({ force: false }).then(() => {
    console.log("Database synchronized successfully.");
  });

  //   // 1 to Many Relation
  //   db.products.hasMany(db.reviews, {
  //     foreignKey: "product_id",
  //     as: "reviews", // Dùng dạng số nhiều để rõ ràng
  //   });

  //   db.reviews.belongsTo(db.products, {
  //     foreignKey: "product_id",
  //     as: "product",
  //   });
})();
console.log("database product : " + db.products);
export default db;
