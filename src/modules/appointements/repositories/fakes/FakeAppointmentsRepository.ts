import { v4 as uuidv4 } from 'uuid';
import { isEqual, getMonth, getYear, getDate } from 'date-fns';
import IAppointmentsRepository from '@modules/appointements/repositories/IAppoitmentsRepository';
import ICreateAppointmentDTO from '@modules/appointements/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointements/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointements/dtos/IFindAllInDayFromProviderDTO';

import Appointments from '@modules/appointements/infra/typeorm/entities/Appointments';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointments[] = [];

  public async findByDate(date: Date): Promise<Appointments | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );
    return findAppointment;
  }

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointments[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );

    return appointments;
  }

  public async findAllInDayFromProvider({
    provider_id,
    day,
    month,
    year,
  }: IFindAllInDayFromProviderDTO): Promise<Appointments[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getDate(appointment.date) === day &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );

    return appointments;
  }

  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointments> {
    const appointment = new Appointments();

    // It's the same as the code below
    Object.assign(appointment, { id: uuidv4(), date, provider_id, user_id });

    // appointment.id = uudi();
    // appointment.date = date;
    // appointment.provider_id = provider_id;

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
