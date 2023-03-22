import 'express-async-errors';
import routes from './shared/infra/http/routes';
import cors from 'cors';
import express from 'express';
import connection from './typeorm';

const app = express();

async function databaseSetup() {
  await connection();
}

databaseSetup();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log('Server Started');
  console.log('link: http://localhost:3333');
});
