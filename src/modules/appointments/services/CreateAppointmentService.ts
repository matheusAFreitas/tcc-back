import { getCustomRepository, getRepository } from 'typeorm';
import dayjs from 'dayjs';

import AppError from '@shared/errors/AppError';
import { errorMessages } from '@shared/errors/errorMessagesEnum';

import Appointment from '../typeorm/entities/Appointment';
import AppointmentsRepository from '../repositories/AppointmentRepository';

import { getCompany, getUser } from '../validators';

interface ICreateAppointment {
  date: Date;
  userId: string;
}

export class CreateAppointmentService {
  public async execute({
    date,
    userId,
  }: ICreateAppointment): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const user = await getUser(userId);
    const company = await getCompany(user.companyName);

    const userCompanyName = user.companyName;
    if (userCompanyName !== company.companyName) {
      throw new AppError(errorMessages.COMPANY_NAME_WRONG, 400);
    }

    const appointmentInSameDate = await appointmentsRepository.findByDate(
      date,
      user.id
    );

    if (appointmentInSameDate.length) {
      throw new AppError(errorMessages.APPOINTMENT_ALREADY_BOOKED, 400);
    }

    const correctDate = dayjs(date);

    const today = dayjs(new Date()).format('YYYY-MM-DD') as unknown as Date;

    const appointment = appointmentsRepository.create({
      providerId: user.id,
      date: correctDate,
    });

    await appointmentsRepository.save(appointment);

    appointment.date = dayjs(appointment.date).format(
      'YYYY-MM-DD'
    ) as unknown as Date;

    return appointment;
  }
}
