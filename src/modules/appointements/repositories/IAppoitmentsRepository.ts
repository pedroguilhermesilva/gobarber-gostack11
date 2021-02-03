import Appointments from '../infra/typeorm/entities/Appointments';
import ICreateAppointmentDTO from '@modules/appointements/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointements/dtos/IFindAllInMonthFromProviderDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointments>;
  findByDate(date: Date): Promise<Appointments | undefined>;
  findAllInMonthFromProvider(
    data: IFindAllInMonthFromProviderDTO,
  ): Promise<Appointments[]>;
}
