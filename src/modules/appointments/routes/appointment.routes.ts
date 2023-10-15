import { Router } from 'express';

import CreateAppointmentService from '../services/CreateAppointmentService';

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

export default appointmentRoutes;
