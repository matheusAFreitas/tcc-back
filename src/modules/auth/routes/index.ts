import { Router } from 'express';
import authRoutes from './auth.routes';

const authRoutesModule = Router();

authRoutesModule.use('/', authRoutes);

export default authRoutesModule;
