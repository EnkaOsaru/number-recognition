"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const model_1 = require("./model");
const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.get('/', (_, res) => res.sendStatus(200));
app.post('/predict', (req, res) => {
    const data = req.body;
    const prediction = model_1.predict(data);
    res.status(200).json(prediction);
});
app.listen(6565);
