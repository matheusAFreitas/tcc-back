import { Router } from 'express';

import userRoutes from './user.routes';

const userRoutesModule = Router();

userRoutesModule.use('/v1', userRoutes);

export default userRoutesModule;
