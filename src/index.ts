import * as express from 'express';
import cors from 'cors';
import compression from 'compression';
import dotenv from 'dotenv';

dotenv.config();

const app = express.default();

app.use(cors());
app.use(compression());

app.get('/', (req, res) => {
  res.send('test');
});

app.listen(process.env.PORT, () => {
  console.log('Server is running on http://localhost:8080/');
});
