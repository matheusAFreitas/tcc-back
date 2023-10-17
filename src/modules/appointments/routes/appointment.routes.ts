import { Router } from 'express';

import {
  CreateAppointmentService,
  DeleteAppointmentService,
  GetAppointmentByUser,
  UpdateAppointmentService,
} from '../services';
import { ensureAuthenticated } from '../../../shared/infra/http/middlewares';

const appointmentRoutes = Router();

appointmentRoutes.post('/', ensureAuthenticated, async (req, res) => {
  const { date } = req.body;

  const userId = req.user.id;

  const createAppointment = new CreateAppointmentService();

  const appointment = await createAppointment.execute({
    date,
    userId,
  });

  console.log('POST:', appointment);
  return res.json(appointment);
});

appointmentRoutes.get('/get', ensureAuthenticated, async (req, res) => {
  const userId = req.user.id;

  const getAppointmentByUser = new GetAppointmentByUser();

  const appointments = await getAppointmentByUser.execute(userId);

  console.log('GET:', appointments);
  return res.json(appointments);
});

appointmentRoutes.patch(
  '/update/:id',
  ensureAuthenticated,
  async (req, res) => {
    const userId = req.user.id;
    const id = req.params.id;
    const { date } = req.body;

    const updateAppointment = new UpdateAppointmentService();

    const appointment = await updateAppointment.execute({ id, date, userId });

    console.log('PATCH:', appointment);
    return res.json(appointment);
  }
);

appointmentRoutes.delete(
  '/remove/:id',
  ensureAuthenticated,
  async (req, res) => {
    const userId = req.user.id;
    const id = req.params.id;

    const deleteAppointment = new DeleteAppointmentService();

    const appointment = await deleteAppointment.execute(id, userId);

    console.log('DELETE:', appointment);
    return res.json(appointment);
  }
);
export default appointmentRoutes;
