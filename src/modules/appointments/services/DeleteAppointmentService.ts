import { getRepository } from 'typeorm';
import Appointment from '../typeorm/entities/Appointment';
import { checkUserAppointment } from '../validators';

export class DeleteAppointmentService {
  public async execute(id: string, bearer: string) {
    const appointmentRepository = getRepository(Appointment);
    const appointment = await checkUserAppointment(id, bearer);

    await appointmentRepository.remove(appointment);

    return appointment;
  }
}
