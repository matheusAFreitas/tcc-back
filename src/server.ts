import 'express-async-errors';

import cors from 'cors';
import express from 'express';

import connection from './typeorm';
import error from './shared/infra/http/error/error';
import routesModule from './shared/infra/http/routes/routes.module';

const app = express();

async function databaseSetup() {
  await connection();
}

databaseSetup();

app.use(cors());
app.use(express.json());
app.use(routesModule);
app.use(error);

app.listen(3333, () => {
  console.log('Server Started');
  console.log('link: http://localhost:3333');
});
