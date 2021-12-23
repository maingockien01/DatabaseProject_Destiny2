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

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => {
    db.query('SELECT * FROM Weapons LIMIT 10').then(queryResult =>{
        res.status(200).send({
            result: queryResult.rows
        })
    })
    
});

module.exports = app;