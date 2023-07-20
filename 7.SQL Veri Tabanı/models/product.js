const connection = require('../utility/database')

module.exports = class Product {

    constructor(name, price, imageUrl, description, categoryid) {
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
        this.description = description;
        this.categoryid = categoryid;
    }

    saveProduct() {
      return new Promise((resolve, reject) => {
        connection.query(
          "INSERT INTO products (name, price, imageUrl, description, categoryid) VALUES (?,?,?,?,?)",
          [this.name, this.price, this.imageUrl, this.description, this.categoryid],
          (error, results, fields) => {
            if (error) {
              reject(error);
            } else {
              resolve(results);
            }
          }
        );
      });
    }
    

    static getAll() {
        return new Promise((resolve, reject) => {
          connection.query("SELECT * FROM products", (error, results, fields) => {
            if (error) {
              reject(error);
            } else {
              resolve(results);
            }
          });
        });
      }

    static getById(id) {
      return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM products WHERE id = ?", [id], (error, results, fields) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });
    }
      

    static getProductsByCategoryId(categoryid) {
      return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM products WHERE categoryid = ?", [categoryid], (error, results, fields) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      })

    }

    static Update(product) {

      return new Promise((resolve, reject) => {

        connection.query(
          "UPDATE products SET products.name = ?, products.price = ?, products.imageUrl = ?, products.description = ?, products.categoryid= ? WHERE products.id = ?",
          [product.name, product.price, product.imageUrl, product.description, product.categoryid, product.id],
          (error, results, fields) => {
            if (error) {
              reject(error);
            } else {
              resolve(results);
            }
          }
        );
      });
    }
    
    static DeleteById(id) {
      return new Promise((resolve, reject) => {
        connection.query("DELETE FROM products WHERE id = ?",[id] , (error, results, fields) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });
       
    }

}

