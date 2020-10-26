"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.launch = void 0;
const express = require("express");
const app = express();
app.use(express.static('.'));
app.get('/', (_, res) => res.sendStatus(200));
function launch() {
    return new Promise(resolve => {
        app.listen(6565, () => resolve());
    });
}
exports.launch = launch;
