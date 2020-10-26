import { exp } from '@tensorflow/tfjs-node';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { predict } from './model';

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.get('/', (_, res) => res.sendStatus(200));
app.post('/predict', (req, res) => {
  const data: number[] = req.body;
  const prediction = predict(data);

  res.status(200).json(prediction);
});

app.listen(6565);