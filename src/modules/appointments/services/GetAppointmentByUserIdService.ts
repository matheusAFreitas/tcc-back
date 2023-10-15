import { getRepository } from 'typeorm';
import { getUser } from '../validators';
import Appointment from '../typeorm/entities/Appointment';

export class GetAppointmentByUser {
  public async execute(bearer: string) {
    const user = await getUser(bearer);

    const providerId = user.id;

    const appointmentsRepository = getRepository(Appointment);

    const appointments = await appointmentsRepository.find({
      where: { providerId },
    });

    return appointments;
  }
}
