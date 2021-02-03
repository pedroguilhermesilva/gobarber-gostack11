import { getRepository, Raw, Repository } from 'typeorm';

import IAppointmentsRepository from '@modules/appointements/repositories/IAppoitmentsRepository';
import ICreateAppointmentDTO from '@modules/appointements/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointements/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointements/dtos/IFindAllInDayFromProviderDTO';

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

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointments[]> {
    const parsedMonth = String(month).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(dateFieldName =>
          `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
        ),
      },
    });

    return appointments;
  }

  public async findAllInDayFromProvider({
    provider_id,
    day,
    month,
    year,
  }: IFindAllInDayFromProviderDTO): Promise<Appointments[]> {
    const parsedDay = String(day).padStart(2, '0');
    const parsedMonth = String(month).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(dateFieldName =>
          `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
        ),
      },
    });

    return appointments;
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
