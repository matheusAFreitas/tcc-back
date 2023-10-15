import { Router } from 'express';

import userRoutesModule from '@modules/user/routes';
import authRoutesModule from '@modules/auth/routes';
import companyRoutesModule from '@modules/company/routes';
import appointmentroutesModule from '@modules/appointments/routes';

const routesModule = Router();

routesModule.use('/auth', authRoutesModule);
routesModule.use('/user', userRoutesModule);
routesModule.use('/company', companyRoutesModule);
routesModule.use('/appointment', appointmentroutesModule);
export default routesModule;
