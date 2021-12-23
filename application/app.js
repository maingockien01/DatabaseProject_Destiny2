const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const db = require('./connection')

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('/', (req, res) => {
    db.query('SELECT * FROM Weapons LIMIT 10').then(queryResult => {
        res.status(200).send({
            result: queryResult.rows
        })
    })

});

app.get('/weapons', (req, res) => {
    const limit = req.query.limit || 100;
    const id = req.query.id

    if (id) {
        db.query('SELECT * FROM Weapons WHERE wID = $1 LIMIT $2', [id, limit]).then(queryResult => {
            res.status(200).send({
                result: queryResult.rows
            })
        })
    } else {
        db.query('SELECT * FROM Weapons LIMIT $1', [limit]).then(queryResult => {
            res.status(200).send({
                result: queryResult.rows
            })
        })
    }
})

app.get('/damageType', (req, res) => {
    const damageTypeId = req.query.id

    if (!damageTypeId) {
        //Return all
        db.query('SELECT * FROM DamageType').then(queryResult => {
            res.status(200).send({
                result: queryResult.rows
            })
        })
    } else {
        //Return 1
        db.query('SELECT * FROM DamageType WHERE dID = $1', [damageTypeId]).then(queryResult => {
            res.status(200).send({
                result: queryResult.rows
            })
        })
    }
})

app.get('/weaponType', (req, res) => {
    const id = req.query.id

    if (!id) {
        //Return all
        db.query('SELECT * FROM WeaponType').then(queryResult => {
            res.status(200).send({
                result: queryResult.rows
            })
        })
    } else {
        //Return 1
        db.query('SELECT * FROM WeaponType WHERE tID = $1', [id]).then(queryResult => {
            res.status(200).send({
                result: queryResult.rows
            })
        })
    }
})

app.get('/tierType', (req, res) => {
    const id = req.query.id

    if (!id) {
        //Return all
        db.query('SELECT * FROM TierType').then(queryResult => {
            res.status(200).send({
                result: queryResult.rows
            })
        })
    } else {
        //Return 1
        db.query('SELECT * FROM TierType WHERE ttID = $1', [id]).then(queryResult => {
            res.status(200).send({
                result: queryResult.rows
            })
        })
    }
})

module.exports = app;