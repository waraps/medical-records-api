import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { MedicalAppointmentDto } from './dto';
import { MedicalAppointmentService } from './medical-appointment.service';

@Controller('medical-appointment')
export class MedicalAppointmentController {
    constructor(private medicalAppointmentServiceService: MedicalAppointmentService) {}

    @Post()
    createAppointment(@Body() new_Appointment: MedicalAppointmentDto) {
        return this.medicalAppointmentServiceService.createAppointment(new_Appointment);
    }

    @Get()
    getAppointments() {
        return this.medicalAppointmentServiceService.getAppointments();
    }

    @Get(':id')
    getAppointmentById(@Param('id', ParseIntPipe) Appointment_id: number) {
        return this.medicalAppointmentServiceService.getAppointmentById(Appointment_id);
    }

    @Put(':id')
    editAppointmentById(@Param('id', ParseIntPipe) Appointment_id: number, @Body() new_Appointment: MedicalAppointmentDto) {
        return this.medicalAppointmentServiceService.editAppointmentById(Appointment_id, new_Appointment);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deleteAppointmentById(@Param('id', ParseIntPipe) Appointment_id: number) {
        return this.medicalAppointmentServiceService.deleteAppointmentById(Appointment_id);
    }
}
