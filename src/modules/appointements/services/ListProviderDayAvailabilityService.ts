import { injectable, inject } from 'tsyringe';
import { getHours } from 'date-fns';

import IAppointmentsRepository from '@modules/appointements/repositories/IAppoitmentsRepository';

interface IRequest {
  provider_id: string;
  year: number;
  month: number;
  day: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentRepository')
    private appointementsRepository: IAppointmentsRepository,
  ) { }

  public async execute({
    provider_id,
    year,
    month,
    day,
  }: IRequest): Promise<IResponse> {
    const appointements = await this.appointementsRepository.findAllInDayFromProvider(
      {
        provider_id,
        year,
        month,
        day,
      },
    );

    const hourStart = 8;

    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart,
    );

    const availability = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointements.find(
        appointment => getHours(appointment.date) === hour,
      );

      return {
        hour,
        available: !hasAppointmentInHour,
      }
    });
    
    return availability;
  }
}

export default ListProviderDayAvailabilityService;
