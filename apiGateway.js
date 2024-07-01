const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const PORT = 3000;

/*
Execute services and gateway
node services/controllerService.js
node services/loggingService.js 
node apiGateway.js
*/

app.use(bodyParser.json());

const services = {
    controllerService: 'http://localhost:3001',
    loggingService: 'http://localhost:3002'
};


app.use('/controller', (req, res) => {
    const url = `${services.controllerService}${req.url}`;
    axios({
        method: req.method,
        url,
        data: req.body
    }).then(response => {
        res.json(response.data);
    }).catch(err => {
        res.status(err.response.status).json(err.response.data);
    });
});

app.use('/logging', (req, res) => {
    const url = `${services.loggingService}${req.url}`;
    axios({
        method: req.method,
        url,
        data: req.body
    }).then(response => {
        res.json(response.data);
    }).catch(err => {
        res.status(err.response.status).json(err.response.data);
    });
});

app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});
