import connection from "../config/database.js";
const getHomepage = async (req, res) => {
  // A simple SELECT query
  try {
    const [results, fields] = await connection.query("SELECT * FROM Users");
    res.render("simple");
  } catch (err) {
    console.log(err);
  }
};

// Xuất hàm dưới dạng ES Module
export { getHomepage };
