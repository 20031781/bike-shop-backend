"use strict";
const Sequelize = require("sequelize"); // libreria che semplifica la gestione del db

// Creazione del database
const sqlConnection = new Sequelize({
    dialect: "sqlite",
    storage: "./bikeshop.sqlite"
});

const db = {};
db.Sequelize = Sequelize;
db.sqlConnection = sqlConnection;
db.bikes = require("./bike.model.js")(sqlConnection, Sequelize);

const User = sqlConnection.define("User", {
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    number: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    seller: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    }
});

db.users = User;
module.exports = db;