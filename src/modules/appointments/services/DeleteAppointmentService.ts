import { getRepository } from 'typeorm';
import Appointment from '../typeorm/entities/Appointment';
import { checkUserAppointment } from '../validators';

export class DeleteAppointmentService {
  public async execute(id: string, userId: string) {
    const appointmentRepository = getRepository(Appointment);
    const appointment = await checkUserAppointment(id, userId);

    await appointmentRepository.remove(appointment);

    appointment.id = id;

    return appointment;
  }
}
