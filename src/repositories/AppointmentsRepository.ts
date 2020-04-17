import { EntityRepository, Repository } from 'typeorm';
import Appointments from '../models/Appointments';

@EntityRepository(Appointments)
class AppointmentsRepository extends Repository<Appointments> {
  public async findByDate(date: Date): Promise<Appointments | null> {
    const findAppointment = await this.findOne({
      // verify if date === date = date: date
      where: { date },
    });

    return findAppointment || null;
  }
}

export default AppointmentsRepository;
