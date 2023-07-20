const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const path = require('path');

app.set('view engine', 'pug');
app.set('views', './views');

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/shop');

const mongoose = require('mongoose');

const errorController = require('./controllers/errors');

const User = require('./models/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use((req, res, next) => {
    User.findOne({name: 'uygareren'})
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => { console.log(err) });
})



app.use('/admin', adminRoutes);
app.use(userRoutes);

app.use(errorController.get404Page);


mongoose.connect('mongodb+srv://uygar:uygareren123@cluster0.sg1tnmy.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log('connected to mongodb');
    User.findOne({name: 'uygareren'})
      .then(user => {
        if (!user) {
          user = new User({
            name: 'uygareren',
            email: 'uygareren@gmail.com',
            cart: {
                items: []
            }
          })
          return user.save();
        }
        return user;
      })
      .then(user => {
        console.log(user);
        app.listen(3000);
      })
      .catch(err => {
        console.log(err);
      });
  })
  .catch(err => {
    console.log(err);
  });
