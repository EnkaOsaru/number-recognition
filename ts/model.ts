import * as path from 'path';
import * as tf from '@tensorflow/tfjs-node';

let model: tf.LayersModel;

(async () => {
  const modelPath = path.join(process.cwd(), 'model/model.json');
  model = await tf.loadLayersModel(`file://${modelPath}`);
  model.summary();
})();

export function predict(data: number[]) {
  const x = tf.tensor(data, [1, 28, 28, 1]);
  const prediction = model.predict(x) as tf.Tensor;
  const probabilities = (prediction.arraySync() as number[][])[0];
  return probabilities;
}