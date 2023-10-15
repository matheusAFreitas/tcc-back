import { Router } from 'express';
import appointmentRoutes from './appointment.routes';

const appointmentroutesModule = Router();

appointmentroutesModule.use('/', appointmentRoutes);

export default appointmentroutesModule;
