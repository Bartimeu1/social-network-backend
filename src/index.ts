import * as express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import compression from 'compression';
import mongoose from 'mongoose';

import options from './config';
import router from './routes';
import { errorHandler } from './middlewares/errorMiddleware';

const app = express.default();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(compression());
app.use(router);
app.use(errorHandler);

(async function () {
  try {
    app.listen(options.port, () => {
      console.log(`Server is running on http://localhost:${options.port}/`);
    });

    await mongoose
      .connect(options.dbUrl)
      .then(() => console.log('Connected to MongoDB'));
  } catch (err) {
    console.log(err);
  }
})();
