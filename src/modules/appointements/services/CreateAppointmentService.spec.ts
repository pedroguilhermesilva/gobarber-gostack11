import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '@modules/appointements/repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentSevice from '@modules/appointements/services/CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentSevice(
      fakeAppointmentsRepository,
    );

    const appointement = await createAppointment.execute({
      date: new Date(),
      provider_id: '123123',
    });
    expect(appointement).toHaveProperty('id');
    expect(appointement.provider_id).toBe('123123');
  });

  it('should not be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentSevice(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '123123',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
