import { Router } from 'express';

import userRoutes from './user.routes';
import sessionsRouter from './session.routes';

const userRoutesModule = Router();

userRoutesModule.use('/create', userRoutes);
userRoutesModule.use('/auth', sessionsRouter);

export default userRoutesModule;
