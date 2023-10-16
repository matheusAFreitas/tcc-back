import { getRepository } from 'typeorm';
import Appointment from '../typeorm/entities/Appointment';

export class GetAppointmentById {
  public async execute(id: string): Promise<Appointment> {
    const appointmentsRepository = getRepository(Appointment);

    const appointment = await appointmentsRepository.findOne({
      where: { id },
    });

    return appointment;
  }
}
