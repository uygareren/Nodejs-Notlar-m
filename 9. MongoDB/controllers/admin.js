const Product = require('../models/product');
const Category = require('../models/category');

exports.getProducts = (req, res, next) => {
    Product.findAll()
        .then(products => {
            res.render('admin/products', {
                title: 'Admin Products',
                products: products,
                path: '/admin/products',
                action: req.query.action
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        title: 'New Product',
        path: '/admin/add-product'
    });
}

exports.postAddProduct = (req, res, next) => {

    const name = req.body.name;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const userId = req.user._id;

    const product = new Product(name, price, description, imageUrl, null, userId);

    product.save()
        .then(result => {
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        });


}

exports.getEditProduct = (req, res, next) => {
    Product.findById(req.params.productid)
        .then((product) => {
            Category.findAll()
                .then((categories) => {
                    categories = categories.map(category => {
                        if (product.categories) {
                            product.categories.find(item => {
                                if (item == category._id) {
                                    category.selected = true;
                                }
                            });
                        }
                        return category;
                    });
                    res.render('admin/edit-product', {
                        title: 'Edit Product',
                        path: '/admin/products',
                        product: product,
                        categories: categories
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });
};



exports.postEditProduct = (req, res, next) => {

    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const userId = req.user._id;
    const categories = req.body.categoryids

    //const categoryid = req.body.categoryid;

    const product = new Product(name, price, description ,imageUrl, categories, id, userId);

    product.save()
        .then(result => {
            res.redirect('/admin/products?action=edit');
        })
        .catch(err => console.log(err));
}

exports.postDeleteProduct = (req, res, next) => {

    const id = req.body.productid;

    Product.deleteById(id)
    .then(result => {
        res.redirect('/admin/products?action=delete');
    }).catch((err) =>{
        console.log(err)
    })
}

exports.getAddCategory = (req,res,next) => {
    res.render('admin/add-category', {
        title: 'Add Category',
        path: '/admin/add-category'
        });

}

exports.postAddCategory = (req, res, next) =>{
    const name = req.body.name;
    const description = req.body.description;

    const category = new Category(name, description);

    category.save()
        .then((result) =>{
            console.log(result)
            res.redirect('/admin/categories?action=add');
        })
        .catch((err) =>{
            console.log(err)
        })
}

exports.getCategories = (req,res,next) => {
    Category.findAll()
        .then((categories) =>{
            res.render('admin/categories', {
                title: 'Categories',
                categories: categories,
                path: '/admin/categories',
                action: req.query.action
                });

        })
}

exports.getEditCategory = (req, res, next) => {
    Category.findById(req.params.categoryid)
        .then((category) =>{
            console.log(category    )
            res.render('admin/edit-category', {
                title: 'Edit Category',
                category: category,
                path: '/admin/categories'
                });
            
        })
}

exports.postEditCategory = (req, res, next) =>{
    const name = req.body.name;
    const description = req.body.description;
    const id = req.body.id

    const category = new Category(name, description, id);

    category.save()
        .then((result) =>{
            console.log(result)
            res.redirect('/admin/categories?action=edit');
        })
        .catch((err) =>{
            console.log(err)
        })
}