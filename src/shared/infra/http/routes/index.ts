import { Router } from 'express';

import userRoutes from './user.routes';
import sessionsRouter from './session.routes';

const routes = Router();

routes.use('/user', userRoutes);
routes.use('/auth', sessionsRouter);

export default routes;
