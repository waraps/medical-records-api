import { Module } from '@nestjs/common';
import { MedicalAppointmentController } from './medical-appointment.controller';
import { MedicalAppointmentService } from './medical-appointment.service';

@Module({
  controllers: [MedicalAppointmentController],
  providers: [MedicalAppointmentService]
})
export class MedicalAppointmentModule {}
