import { Router } from 'express';

import userRoutesModule from '../../../../modules/user/routes';
import companyRoutesModule from '../../../../modules/company/routes';

const routesModule = Router();

routesModule.use('/user', userRoutesModule);
routesModule.use('/company', companyRoutesModule);

export default routesModule;
