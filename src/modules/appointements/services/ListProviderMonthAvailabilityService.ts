import { injectable, inject } from 'tsyringe';
import { getDaysInMonth } from 'date-fns';

import IAppointmentsRepository from '@modules/appointements/repositories/IAppoitmentsRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentRepository')
    private appointementsRepository: IAppointmentsRepository,
  ) { }

  public async execute({ provider_id, month, year }: IRequest): Promise<IResponse> {
    const appointments = await this.appointementsRepository.findAllInMonthFromProvider(
      {
        provider_id,
        year,
        month,
      }
    );

    console.log(appointments)
    
    return [{ day: 1, available: false }];
  }
}

export default ListProviderMonthAvailabilityService;
