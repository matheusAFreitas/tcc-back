import { Router } from 'express';
import companyRoutes from './company.routes';

const companyRoutesModule = Router();

companyRoutesModule.use('/create', companyRoutes);

export default companyRoutesModule;
