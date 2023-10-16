import { Router } from 'express';

import {
  CreateAppointmentService,
  DeleteAppointmentService,
  GetAppointmentByUser,
  UpdateAppointmentService,
} from '../services';

const appointmentRoutes = Router();

appointmentRoutes.post('/', async (req, res) => {
  const { date } = req.body;

  const bearer = req.headers.authorization;

  const createAppointment = new CreateAppointmentService();

  const appointment = await createAppointment.execute({
    date,
    bearer,
  });

  console.log('POST:', appointment);
  return res.json(appointment);
});

appointmentRoutes.get('/get', async (req, res) => {
  const bearer = req.headers.authorization;

  const getAppointmentByUser = new GetAppointmentByUser();

  const appointments = await getAppointmentByUser.execute(bearer);

  console.log('GET:', appointments);
  return res.json(appointments);
});

appointmentRoutes.patch('/update/:id', async (req, res) => {
  const id = req.params.id;
  const bearer = req.headers.authorization;
  const { date } = req.body;

  const updateAppointment = new UpdateAppointmentService();

  const appointment = await updateAppointment.execute({ id, date, bearer });

  console.log('PATCH:', appointment);
  return res.json(appointment);
});

appointmentRoutes.delete('/remove/:id', async (req, res) => {
  const id = req.params.id;
  const bearer = req.headers.authorization;

  const deleteAppointment = new DeleteAppointmentService();

  const appointment = await deleteAppointment.execute(id, bearer);

  console.log('DELETE:', appointment);
  return res.json(appointment);
});
export default appointmentRoutes;
