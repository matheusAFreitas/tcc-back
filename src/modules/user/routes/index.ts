import { Router } from 'express';

import userRoutes from './user.routes';

const userRoutesModule = Router();

userRoutesModule.use('/', userRoutes);

export default userRoutesModule;
