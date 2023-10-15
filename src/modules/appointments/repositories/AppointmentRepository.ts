import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../typeorm/entities/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate(
    date: Date,
    providerId: string
  ): Promise<Array<Appointment> | null> {
    const appointment = await this.find({
      where: { date, providerId },
    });
    return appointment || null;
  }
}

export default AppointmentsRepository;
