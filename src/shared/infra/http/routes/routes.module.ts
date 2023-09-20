import { Router } from 'express';

import userRoutesModule from '../../../../modules/user/routes';
import companyRoutesModule from '../../../../modules/company/routes';
import authRoutesModule from '../../../../modules/auth/routes';

const routesModule = Router();

routesModule.use('/auth', authRoutesModule);
routesModule.use('/user', userRoutesModule);
routesModule.use('/company', companyRoutesModule);

export default routesModule;
