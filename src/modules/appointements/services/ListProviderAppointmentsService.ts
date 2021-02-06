import { injectable, inject } from 'tsyringe';

import Appointment from '@modules/appointements/infra/typeorm/entities/Appointments';
import IAppointmentsRepository from '@modules/appointements/repositories/IAppoitmentsRepository';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
   @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) { }

  public async execute({
    provider_id,
    day,
    month,
    year
  }: IRequest): Promise<Appointment[]> {
    const appointements = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        provider_id,
        day,
        month,
        year
      },
    );

    return appointements;
  }
}

export default ListProviderAppointmentsService;
