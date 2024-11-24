import connection from "../config/database.js";
const getAllUser = async () => {
  try {
    const [results, fields] = await connection.query(`SELECT * FROM Users`);
    return results;
  } catch (err) {
    console.error("Lỗi khi thực thi truy vấn:", err);
    throw err; // Ném lại lỗi sau khi đã ghi log
  }
};

const getUserById = async (id) => {
  try {
    const [results, fields] = await connection.query(
      `SELECT * FROM Users where id = ${id}`
    );
    if (results.length > 0) return results[0];
    else return null;
  } catch (error) {
    console.error("Loi truy van du lieu", error);
    throw error;
  }
};

const UppdateUser = async (user) => {
  try {
    const query = `UPDATE Users SET email = ?, city = ? WHERE id = ?`;
    const [results] = await connection.query(query, [
      user.email,
      user.city,
      user.id,
    ]);
    return results;
  } catch (error) {
    console.error("Loi truy van du lieu", error);
    throw error;
  }
};

const deleteUserInDB = async (id) => {
  try {
    const query = `DELETE FROM Users WHERE id = ?`;
    const [results] = await connection.query(query, [id]);
    return results;
  } catch (error) {
    console.error("Loi truy van du lieu", error);
    throw error;
  }
};

export { getAllUser, getUserById, UppdateUser, deleteUserInDB };
