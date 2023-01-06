import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { MedicalAppointmentDto } from './dto';
import { MedicalAppointmentService } from './medical-appointment.service';

@UseGuards(JwtGuard)
@Controller('medical-appointment')
export class MedicalAppointmentController {
    constructor(private medicalAppointmentService: MedicalAppointmentService) {}

    @Post()
    createAppointment(@Body() new_Appointment: MedicalAppointmentDto) {
        return this.medicalAppointmentService.createAppointment(new_Appointment);
    }

    @Get()
    getAppointments() {
        return this.medicalAppointmentService.getAppointments();
    }

    @Get('me')
    getAppointmentsByDoctor(@GetUser('id') doctor_id: number) {
        return this.medicalAppointmentService.getAppointmentsByDoctor(doctor_id);
    }

    @Get(':id')
    getAppointmentById(@Param('id', ParseIntPipe) Appointment_id: number) {
        return this.medicalAppointmentService.getAppointmentById(Appointment_id);
    }

    @Get('my/current')
    getCurrtentAppointment(@GetUser('id') doctor_id: number) {
        return this.medicalAppointmentService.getCurrtentAppointment(doctor_id);
    }

    @Put(':id')
    editAppointmentById(@Param('id', ParseIntPipe) Appointment_id: number, @Body() new_Appointment: MedicalAppointmentDto) {
        return this.medicalAppointmentService.editAppointmentById(Appointment_id, new_Appointment);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deleteAppointmentById(@Param('id', ParseIntPipe) Appointment_id: number) {
        return this.medicalAppointmentService.deleteAppointmentById(Appointment_id);
    }
}
