const https = require('https');
const fs = require('fs');
const express = require('express');
const cors = require('cors'); //restringe intercambio de datos
const bodyParser = require('body-parser');
const accesstoken = require('./accesstoken.js');
const compression = require('compression');

const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(cors())
app.use(compression());

const privateKey = fs.readFileSync('./.cert/key-pem', 'utf8');
const certificate = fs.readFileSync('./.cert/cert.pem', 'utf8');

const credentials = {key: privateKey, cert: certificate}

app.get('/', (req, res) => {

    const userAgent = 'PPOL.io';
    req.headers['User-Agent'] = userAgent;
    accesstoken.sendResponse(req, res);
});

const httpsApp = https.createServer(credentials, app);
httpsApp.listen(3000, () => {
    console.log("Running on https://localhost:3000")
});