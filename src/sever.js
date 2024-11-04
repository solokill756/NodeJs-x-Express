// Import các thư viện và mô-đun
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import mysql from 'mysql2';
import configViewEngine from './config/viewEngine.js';
import webRouters from './routers/web.js';

const app = express();
const hostName = process.env.HOST_NAME;
const port = process.env.PORT || 8888;

// Tạo kết nối đến cơ sở dữ liệu
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3307,
  password: '123456',
  user: 'root',
  database: 'testing',
});

// Thực hiện truy vấn SELECT đơn giản
connection.query('SELECT * FROM Users', (err, results, fields) => {
  if (err) {
    console.error('Lỗi khi truy vấn cơ sở dữ liệu:', err);
    return;
  }
  console.log(results); // Kết quả chứa các hàng trả về từ máy chủ
  console.log(fields);  // Fields chứa dữ liệu meta về kết quả, nếu có
});

configViewEngine(app);

// Khai báo route
app.use('/', webRouters);

// Bắt đầu server
app.listen(port, hostName, () => {
  console.log(`listening on port ${port}`);
});
