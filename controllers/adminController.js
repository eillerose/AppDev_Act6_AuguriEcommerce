const Product = require('../models/product');
const User = require('../models/user');

exports.getDashboard = async (req, res) => {
    try {
        const userCount = await User.count(); // Count users
        const productCount = await Product.count(); // Count products

        res.render('admin/dashboard', {
            userCount: userCount,
            productCount: productCount
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Server Error');
    }
};
