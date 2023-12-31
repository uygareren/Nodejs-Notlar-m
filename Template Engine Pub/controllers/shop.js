const Product = require('../models/product');
const Category = require('../models/category');

exports.getIndex = (req, res, next) => {
    const products = Product.getAll();
    const categories = Category.getAll();

    res.render('shop/index', {
        title: 'Shopping',
        products: products,
        categories: categories,
        path: '/'
    });
}

exports.getProducts = (req, res, next) => {
    const products = Product.getAll();
    const categories = Category.getAll();

    res.render('shop/products', {
        title: 'Products',
        products: products,
        categories: categories,
        path: '/products'
    });
}

exports.getProductsByCategoryId = (req, res, next) => {
    const categoryid = req.params.categoryid;
    const products = Product.getProductsByCategoryId(categoryid);
    const categories = Category.getAll();

    res.render('shop/products', {
        title: 'Products',
        products: products,
        categories: categories,
        selectedCategory: categoryid,
        path: '/products'
    });
}




exports.getProduct = (req, res, next) => {
    const product = Product.getById(req.params.productid);
    const category = Category.getById(product.categoryid);

    res.render('shop/product-detail', {
        title: product.name,
        product: product,
        path: '/products',
        category: category
    });
}


exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        title: 'Cart',
        path: '/cart'
    });
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        title: 'Orders',
        path: '/orders'
    });
}


