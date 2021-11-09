"use strict";
module.exports = (app) => {
    const bikes = require("../controllers/bike.controller.js");

    const router = require("express").Router();

    //POST localhost/api/bikes
    app.use("/api/bikes", router);

    // Crea e salva una nuova moto
    router.post("/", bikes.create);

    // Recupera tutte le moto dal database
    router.get("/", bikes.findAll);

    // Trova tutte le moto pubblicate
    router.get("/published", bikes.findAllPublished);

    // Trova una moto singola con un ID
    router.get("/:id", bikes.findOne);

    // Aggiorna una moto in base all'id nella richiesta
    router.put("/:id", bikes.update);

    // Elimina una moto con l'id specificato nella richiesta
    router.delete("/:id", bikes.delete);

    // Cancella tutte le moto dal database
    router.delete("/", bikes.deleteAll);
};