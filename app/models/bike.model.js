"use strict";

module.exports = (sequelize, Sequelize) => {
    return sequelize.define("bike", {
        brand: {
            type: Sequelize.STRING
        },
        model: {
            type: Sequelize.STRING
        },
        displacement: {
            type: Sequelize.STRING
        },
        times: {
            type: Sequelize.STRING
        },
        category: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.STRING
        },
        rented: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    });
};