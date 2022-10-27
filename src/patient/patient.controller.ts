import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { EditPatientDto, PatientDto } from './dto';
import { PatientService } from './patient.service';

@UseGuards(JwtGuard)
@Controller('patients')
export class PatientController {
    constructor(private patientService: PatientService) {}

    @Post()
    createPatient(@GetUser('id') user_id: number, @Body() patient: PatientDto) {
        return this.patientService.createPatient(user_id, patient);
    }

    @Get()
    getPatients() {
        return this.patientService.getPatients();
    }

    @Get(':id')
    getPatientById(@Param('id', ParseIntPipe) patient_id: number) {
        return this.patientService.getPatientById(patient_id);
    }

    @Put(':id')
    editPatientById(@Param('id', ParseIntPipe) patient_id: number, @Body() update_patient: EditPatientDto) {
        return this.patientService.editPatientById(patient_id, update_patient);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deletePatientById(@Param('id', ParseIntPipe) patient_id: number) {
        return this.patientService.deletePatientById(patient_id);
    }
}
