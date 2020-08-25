import { getRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '@modules/appointements/repositories/IAppoitmentsRepository';
import ICreateAppointmentDTO from '@modules/appointements/dtos/ICreateAppointmentDTO';

import Appointments from '../entities/Appointments';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointments>;

  constructor() {
    this.ormRepository = getRepository(Appointments);
  }

  public async findByDate(date: Date): Promise<Appointments | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      // verify if date === date = date: date
      where: { date },
    });

    return findAppointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointments> {
    const appointement = this.ormRepository.create({ provider_id, date });

    await this.ormRepository.save(appointement);

    return appointement;
  }
}

export default AppointmentsRepository;
