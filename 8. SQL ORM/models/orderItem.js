const Sequelize = require("sequelize");
const sequelize = require("../utility/database");

const OrderItem = sequelize.define('orderItem', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantitiy: Sequelize.INTEGER,
    price: Sequelize.DOUBLE
});

module.exports =  OrderItem;