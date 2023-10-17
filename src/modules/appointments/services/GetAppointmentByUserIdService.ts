import { getRepository } from 'typeorm';
import { getUser } from '../validators';
import Appointment from '../typeorm/entities/Appointment';
import dayjs from 'dayjs';

export class GetAppointmentByUser {
  public async execute(userId: string) {
    const user = await getUser(userId);

    const providerId = user.id;

    const appointmentsRepository = getRepository(Appointment);

    const appointments = await appointmentsRepository.find({
      where: { providerId },
    });

    appointments.forEach((appointment) => {
      appointment.date = dayjs(appointment.date).format(
        'YYYY-MM-DD'
      ) as unknown as Date;
    });

    return appointments;
  }
}
