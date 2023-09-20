import { Router } from 'express';

import userRoutes from './user.routes';
import sessionsRouter from './session.routes';

const userRoutesModule = Router();

userRoutesModule.use('/v1', userRoutes);
userRoutesModule.use('/auth', sessionsRouter);

export default userRoutesModule;
