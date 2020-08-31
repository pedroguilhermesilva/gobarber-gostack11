import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';
import IAppointmentsRepository from '@modules/appointements/repositories/IAppoitmentsRepository';
import ICreateAppointmentDTO from '@modules/appointements/dtos/ICreateAppointmentDTO';

import Appointments from '@modules/appointements/infra/typeorm/entities/Appointments';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointments[] = [];

  public async findByDate(date: Date): Promise<Appointments | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );
    return findAppointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointments> {
    const appointment = new Appointments();

    // It's the same as the code below
    Object.assign(appointment, { id: uuid(), date, provider_id });

    // appointment.id = uudi();
    // appointment.date = date;
    // appointment.provider_id = provider_id;

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
