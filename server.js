
const express = require('express');
const cors = require('cors'); //restringe intercambio de datos
const app = express();
const bodyParser = require('body-parser');
const accesstoken = require('./accesstoken.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.get('/', accesstoken.sendResponse);

app.listen(3000, () => {
    console.log("Running on https://localhost:3000")
});