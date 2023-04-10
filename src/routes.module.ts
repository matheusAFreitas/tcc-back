import { Router } from 'express';
import companyRoutesModule from './modules/company/routes';
import userRoutesModule from './modules/user/routes';

const routesModule = Router();

routesModule.use('/user', userRoutesModule);
routesModule.use('/company', companyRoutesModule);

export default routesModule;
