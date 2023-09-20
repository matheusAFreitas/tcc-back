import * as dotenv from 'dotenv';
import 'express-async-errors';

import cors from 'cors';
import express from 'express';

import connection from './typeorm';
import error from './shared/infra/http/error/error';
import routesModule from './shared/infra/http/routes/routes.module';

async function databaseSetup() {
  await connection();
}

databaseSetup();

const app = express();

app.use(cors());
app.use(express.json());
app.use(routesModule);
app.use(error);

dotenv.config();

const port = process.env.PORT;

app.listen(port, () => {
  console.log('Server Started');
  console.log(`link: http://localhost:${port}`);
});
