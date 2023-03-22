import 'express-async-errors';

import cors from 'cors';
import express from 'express';

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3333, () => {
  console.log('Server Started');
  console.log('link: http://localhost:3333');
});
