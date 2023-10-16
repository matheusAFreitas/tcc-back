import AppError from '@shared/errors/AppError';
import { IUpdateAppointment } from '../interfaces';
import { checkUserAppointment, getUser } from '../validators';
import { GetAppointmentById } from './GetAppointmentByIdService';
import { errorMessages } from '@shared/errors/errorMessagesEnum';
import { getRepository } from 'typeorm';
import Appointment from '../typeorm/entities/Appointment';

export class UpdateAppointmentService {
  public async execute({ id, date, bearer }: IUpdateAppointment) {
    const appointmentRepository = getRepository(Appointment);

    const appointment = await checkUserAppointment(id, bearer);

    if (date) {
      appointment.date = date;
    } else {
      throw new AppError(errorMessages.DATE_CANNOT_BE_EMPTY, 400);
    }

    await appointmentRepository.save(appointment);

    return appointment;
  }
}
