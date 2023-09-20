import { Router } from 'express';
import companyRoutes from './company.routes';

const companyRoutesModule = Router();

companyRoutesModule.use('/v1', companyRoutes);

export default companyRoutesModule;
