"use strict";
const db = require('../models');
const Bike = db.bikes;
const sqlConnection = db.sqlConnection; // prima db.Sequelize.sqlConnection

// Crea e salva una nuova moto
exports.create = (req, res) => {
    // Convalida richiesta
    if (!req.body.brand) {
        res.status(400).send({
            message: "Il contenuto non può essere vuoto!"
        });
        return;
    }

    // Crea una moto
    const bike = {
        brand: req.body.brand,
        model: req.body.model,
        displacement: req.body.displacement,
        times: req.body.times,
        category: req.body.category,
        price: req.body.price
    };

    // Salva la moto nel database
    Bike.create(bike)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Si è verificato un errore durante la creazione della moto."
            });
        });
};

// Recupera tutte le moto dal database
exports.findAll = (req, res) => {
    const brand = req.query.brand;
    let condition = brand
        ? {brand: {[sqlConnection.like]: `%${brand}%`}} // ricerca sulle moto con all'interno il brand
        : null;

    Bike.findAll({
        where: condition
    })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Si è verificato un errore durante il recupero delle moto."
            });
        });
};

// Trova una moto singola con un ID
exports.findOne = (req, res) => {
    const id = req.params.id;

    Bike.findByPk(id)
        .then((data) => {
            res.send(data);
        })
        .catch(() => {
            res.status(500).send({
                message: "Errore nel recupero della moto con id = " + id
            });
        });
};

// Aggiorna una moto in base all'id nella richiesta
exports.update = (req, res) => {
    const id = req.params.id;

    Bike.update(req.body, {
        where: {id: id}
    })
        .then((num) => { // numero delle cose aggiornate

            if (num === 1) {
                res.status(200).send({
                    message: "La moto è stata aggiornata con successo."
                });
            } else {
                res.status(400).send({
                    message: `Impossibile aggiornare la moto con id = ${id}. Forse la moto non è stata trovata o req.body è vuoto!`
                });
            }
        })
        .catch(() => {
            res.status(500).send({
                message: "Errore durante l'aggiornamento della moto con id = " + id
            });
        });
};

// Elimina una moto con l'id specificato nella richiesta
exports.delete = (req, res) => {
    const id = req.params.id;

    Bike.destroy({
        where: {id: id}
    })
        .then((num) => { // numero delle cose aggiornate
            if (num === 1) {
                res.status(200).send({
                    message: "La moto è stata eliminata con successo!"
                });
            } else {
                res.status(500).send({
                    message: `Impossibile eliminare la moto con id = ${id}. Forse la bici non è stata trovata!`
                });
            }
        })
        .catch(() => {
            res.status(500).send({
                message: "Impossibile eliminare la moto con id = " + id
            });
        });
};

// Cancella tutte le moto dal database
exports.deleteAll = (req, res) => {
    Bike.destroy({
        where: {},
        truncate: false // così cancello il contenuto ma non la tabella in sè
    })
        .then((num) => { // numero delle cose aggiornate
            res.status(200).send({
                message: `Le moto ${num} sono state eliminate con successo`
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Si è verificato un errore durante la rimozione di tutte le moto."
            });
        });
};

// Trova tutte le moto pubblicate
exports.findAllPublished = (req, res) => {
    Bike.findAll({
        where: {published: true}
    })
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Si è verificato un errore durante il recupero delle moto."
            });
        });
};