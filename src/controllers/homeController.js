const getHomepage = (req, res) => {
    res.render('simple.ejs');
};

// Xuất hàm dưới dạng ES Module
export { getHomepage };
