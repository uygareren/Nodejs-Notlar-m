const connection = require('../utility/database')


module.exports = class Category {
    constructor(name, description) {
        this.id = (categories.length + 1).toString();
        this.name = name;
        this.description = description;
    }

    saveProduct() {
        return new Promise((resolve, reject) => {
          connection.query(
            "INSERT INTO categories (name, description) VALUES (?,?)",
            [this.name, this.description],
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
          connection.query("SELECT * FROM categories", (error, results, fields) => {
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
          connection.query("SELECT * FROM categories WHERE id = ?", [id], (error, results, fields) => {
            if (error) {
              reject(error);
            } else {
              resolve(results);
            }
          });
        });
      }

      static Update(category) {

        return new Promise((resolve, reject) => {
  
          connection.query(
            "UPDATE categories SET categories.name = ?, categories.description = ? ",
            [category.name, category.description],
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
          connection.query("DELETE FROM categories WHERE id = ?",[id] , (error, results, fields) => {
            if (error) {
              reject(error);
            } else {
              resolve(results);
            }
          });
        });
         
      }
}