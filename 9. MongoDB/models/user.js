const getDb = require('../utility/database').getdb;
const mongodb = require("mongodb");


class User {
    constructor(name, email, cart, _id){
        this.name = name;
        this.email = email;
        this.cart = cart ? cart : {};
        this.cart.items = cart ? cart.items : [];
        this._id = _id;
    }

    save(){
        const db = getDb();
        return db.collection("users")
            .insertOne(this);
    }

    getCart(){

        const ids = this.cart.items.map(i => {
            return i.productId
        })
        
        const db = getDb()
        return db.collection("products")
            .find({ _id: {
                $in: ids } 
                })
            .toArray()
            .then((products) => {
                return products.map(p => {
                    return {
                        ...p, 
                        quantity: this.cart.items.find(i => {
                            return i.productId.toString() === p._id.toString();
                        }).quantity
                    }
                })
            })

            
            
    }

    addToCart(product){

        const updatedCartItems = [...this.cart.items]
        let itemQuantity = 1;

        const index = updatedCartItems.findIndex(cp => 
            cp.productId.toString() === product._id.toString());


        if(index > -1){ // zaten ürün varsa ve quantity arttırıyorsak
            itemQuantity = this.cart.items[index].quantity + 1;
            updatedCartItems[index].quantity = itemQuantity;

        }else { // ürün yoksa ve yeni ekliyorsak
            updatedCartItems.push({
                productId: new mongodb.ObjectId(product._id),
                quantity: itemQuantity
                });
                
        } 

        const db = getDb();
        return db.collection('users')
            .updateOne(
                {_id : new mongodb.ObjectId(this._id)},
                {$set : {
                    cart : {
                        items : updatedCartItems
                    }
                }}
                )

    }

    deleteById(productid) {
        let itemQuantity = 1;
        const updatedCartItems = [...this.cart.items];
      
        const index = updatedCartItems.findIndex(p => {
          return p.productId.toString() === productid.toString();
        });
      
        if (index > -1) {
          let quantity = updatedCartItems[index].quantity;
      
          if (quantity > 1) {
            itemQuantity = this.cart.items[index].quantity - 1;
            updatedCartItems[index].quantity = itemQuantity;
          } else if (quantity === 1) {
            updatedCartItems.splice(index, 1);
          }
        } else {
          return {
            message: "ürün bulunamadı"
          };
        }
      
        const db = getDb();
        return db.collection('users').updateOne(
          { _id: new mongodb.ObjectId(this._id) },
          {
            $set: {
              cart: {
                items: updatedCartItems
              }
            }
          }
        );
      }

    getOrder(){

        const db = getDb()
        return db.collection("orders")
            .find({'user._id' : new mongodb.ObjectId(this._id)})
            .toArray()
            

    }  

    postOrder(){
        const db = getDb()
        return this.getCart()
            .then((products) => {
                const order = {
                    items: products,
                    user: {
                        _id : new mongodb.ObjectId(this._id),
                        name: this.name,
                        email : this.email
                    },
                    date: new Date().toLocaleString()
                }
                return db.collection("orders").insertOne(order)
                    .then(() => {
                        this.cart = {items: []}
                        return db.collection("users")
                            .updateOne({_id: new mongodb.ObjectId(this._id)}, {$set: {
                                cart: {
                                    items: []
                                }
                            }})
                    });
            });

        
    }
      

    static findByName(username){
        const db = getDb();
        return db.collection("users")
            .findOne({name: username})
            .then((user) =>{
                return user
            })
            .catch((err) =>{
                console.log(err);
            })
    }
}

module.exports = User;