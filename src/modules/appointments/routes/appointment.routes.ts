import { Router } from 'express';

import CreateAppointmentService from '../services/CreateAppointmentService';
import { GetAppointmentByUser } from '../services';

const appointmentRoutes = Router();

appointmentRoutes.post('/', async (req, res) => {
  try {
    const { date } = req.body;

    const bearer = req.headers.authorization;

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
      date,
      bearer,
    });

    console.log('POST:', appointment);
    return res.json(appointment);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

appointmentRoutes.get('/get', async (req, res) => {
  try {
    const bearer = req.headers.authorization;

    const getAppointmentByUser = new GetAppointmentByUser();

    const appointments = await getAppointmentByUser.execute(bearer);

    console.log('GET:', appointments);
    return res.json(appointments);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default appointmentRoutes;
