import { getRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import { errorMessages } from '@shared/errors/errorMessagesEnum';

import { getUser } from './getUser';
import { GetAppointmentById } from '../services';

export async function checkUserAppointment(id: string, userId: string) {
  const user = await getUser(userId);
  const providerId = user.id;

  const getAppointment = new GetAppointmentById();

  const appointment = await getAppointment.execute(id);

  if (!appointment) {
    throw new AppError(errorMessages.APPOINTMENT_NOT_FOUND, 404);
  }

  if (appointment.providerId !== providerId) {
    throw new AppError(errorMessages.APPOINTMENT_FROM_OTHER_USER, 403);
  }

  return appointment;
}
