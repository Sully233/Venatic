const express = require('express');
const helmet = require('helmet');
const serverless = require('serverless-http');
const mongoose = require('mongoose');

const app = express();
const PORT = 80;

app.use(helmet());
app.use(express.json());

app.get('/tshirt', (req, res) => {
    res.status(200).send({
        tshirt: 'LARGE',
    });
});

app.get('/tshirtsmall', (req, res) => {
    res.status(200).send({
        tshirt: process.env.TSHIRT_SIZE_SMALL,
    });
});

app.post('/tshirt/:id', (req, res) => {
    const { id } = req.params;
    const { logo } = req.body;
    res.json(`${id} and ${logo}`);
});

app.listen(PORT, () => console.log('Server is alive on port ' + PORT));

