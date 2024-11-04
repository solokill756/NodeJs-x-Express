import path from 'path';
import express from 'express';

const configViewEngine = (app) => {
    app.set('views', path.join('./src', 'views'));
    app.set('view engine', 'ejs');
    // cấu hình các file tĩnh
    app.use(express.static(path.join('./src', 'public')));
};

// Xuất hàm dưới dạng ES Module
export default configViewEngine;
