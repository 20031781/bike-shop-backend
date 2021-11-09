"use strict";
const express = require("express");
const cors = require("cors"); // CORS = cross-origin HTTP request, plugin di express
const app = express();

const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200
};

app.use(express.json());
// noinspection JSCheckFunctionSignatures
app.use(cors(corsOptions)); // warning falso positivo, disattivato con la riga 12

// body-parser estrae l'intera parte del corpi di un flusso di richieste in entrata e lo espone su req.body
const bodyParser = require("body-parser");

// analizza il testo come JSON e espone l'oggetto risultante su req.body - application/json
app.use(bodyParser.json());

// analizza il testo come dati codificati URL e espone l'oggetto risultante su req.body - application/x-www-bike-shop-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

const db = require("./app/models");
require("./app/routes/tutorial.routes")(app);

// Evita che il database venga resettato.
// Necessario eseguire se non si possiede il file bikeshop.sqlite (così lo aggiunge automaticamente).
db.sqlConnection.sync({force: true}).then(() => {
    console.log("Eliminato e ri sincronizzato db.");
});


// route semplice
app.get("/", (req, res) => {
    res.json({
        message: "Benvenuti al Bike Shop di Lorenzo!"
    });
});

app.post("/signup", (req, res) => {
    const username = req.body.username;
    const name = req.body.name;
    const email = req.body.email;
    const number = req.body.number;
    const password = req.body.password;
    const seller = req.body.seller;

    db.users.create({
        username,
        name,
        email,
        number,
        password,
        seller
    })
        .then((data) => {
            console.log(data);
            res.status(201).send({
                message: "Utente creato",
                user: data
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: "Errore durante la registrazione dell'utente",
                err: err
            });
        });
});

app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.users.findOne({
        where: {username, password}
    })
        .then((data) => {
            delete data.password;
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(404).send(err);
        });
});

// localhost:8080/
app.listen(8080, () => { // imposta la porta e ascolta le richieste
    console.log(`Il server è in esecuzione sulla porta ${8080}.`);
});