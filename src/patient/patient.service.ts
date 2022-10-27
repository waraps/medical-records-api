import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditPatientDto, PatientDto } from './dto';

@Injectable()
export class PatientService {
    constructor(private prisma: PrismaService) {}

    async createPatient(user_id: number, patient: PatientDto) {
        try {
            const pet_birth: Date = new Date(patient.pet_birth);

            const newPatient = await this.prisma.patient.create({
                data: {
                    owner_first_name: patient.owner_first_name,
                    owner_last_name: patient.owner_last_name,
                    owner_phone: patient.owner_phone,
                    owner_dni: patient.owner_dni,
                    owner_email: patient.owner_email,
                    pet_specie: patient.pet_specie,
                    pet_race: patient.pet_race,
                    pet_name: patient.pet_name,
                    pet_birth: pet_birth,
                    pet_color: patient.pet_color,
                    pet_sex_id: patient.pet_sex_id,
                    neutered: patient.neutered,
                    created_by: user_id,
                    pet_avatar: patient.pet_avatar || "https://cdn-icons-png.flaticon.com/512/21/21645.png",
                },
            });
    
            return newPatient;
        } catch (error) {
            throw error;
        }
    }

    async getPatients() {
        try {
            return this.prisma.patient.findMany();   
        } catch (error) {
            throw error;
        }
    }

    async getPatientById(patient_id: number) {
        try {
            return this.prisma.patient.findFirst({
                where: {
                    id: patient_id,
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async editPatientById(patient_id: number, update_patient: EditPatientDto) {
        try {
            const patient = await this.prisma.patient.findUnique({
                where: {
                    id: patient_id
                }
            });
    
            if(!patient) {
                throw new ForbiddenException('Patient does not exists');
            }

            const pet_birth: Date = new Date(update_patient.pet_birth);
            delete update_patient.pet_birth;
            
            return this.prisma.patient.update({
                where: {
                    id: patient_id
                },
                data: {
                    pet_birth: pet_birth,
                    ...update_patient
                },
            });
        } catch (error) {
            throw error;
        }
    }

    async deletePatientById(patient_id: number) {
        try {
            const patient = await this.prisma.patient.findUnique({
                where: {
                    id: patient_id
                }
            });
    
            if(!patient) {
                throw new ForbiddenException('Patient does not exists');
            }
    
            await this.prisma.patient.delete({
                where: {
                    id: patient_id,
                }
            });
        } catch (error) {
            throw error;
        }
    }
}
