"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.predict = void 0;
const path = require("path");
const tf = require("@tensorflow/tfjs-node");
let model;
(async () => {
    const modelPath = path.join(process.cwd(), 'model/model.json');
    model = await tf.loadLayersModel(`file://${modelPath}`);
    model.summary();
})();
function predict(data) {
    const x = tf.tensor(data, [1, 28, 28, 1]);
    const prediction = model.predict(x);
    const probabilities = prediction.arraySync()[0];
    return probabilities;
}
exports.predict = predict;
