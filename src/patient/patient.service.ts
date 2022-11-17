import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditPatientDto, PatientDto } from './dto';

@Injectable()
export class PatientService {
    constructor(private prisma: PrismaService) {}

    async createPatient(user_id: number, patient: PatientDto) {
        try {

            const owner = await this.prisma.owner.findUnique({
                where: {
                    id: patient.owner_id
                }
            });

            if(!owner) {
                throw new ForbiddenException('Owner does not exists');
            }

            const pet_birth: Date = new Date(patient.birth);

            const existsPatient = await this.prisma.patient.findFirst({
                where: {
                    specie: patient.specie,
                    race: patient.race,
                    name: patient.name,
                    birth: pet_birth,
                    color: patient.color,
                    sex_id: patient.sex_id,
                    neutered: patient.neutered,
                    owner_id: patient.owner_id,
                }
            });

            if(existsPatient) {
                throw new ForbiddenException('Owner already has a pet registered with these details');
            }

            const newPatient = await this.prisma.patient.create({
                data: {
                    specie: patient.specie,
                    race: patient.race,
                    name: patient.name,
                    birth: pet_birth,
                    color: patient.color,
                    sex_id: patient.sex_id,
                    neutered: patient.neutered,
                    owner_id: patient.owner_id,
                    created_by: user_id,
                    avatar: patient.avatar || "https://cdn-icons-png.flaticon.com/512/21/21645.png",
                },
            });
    
            return newPatient;
        } catch (error) {
            throw error;
        }
    }

    async getPatients() {
        try {
            return this.prisma.patient.findMany({
                select: {
                    id: true,
                    specie: true,
                    race: true,
                    name: true,
                    birth: true,
                    color: true,
                    sex_id: true,
                    pet_sex: true,
                    neutered: true,
                    owner_id: true,
                    created_by: true,
                    user: true,
                    avatar: true,
                    createdAt: true,
                }
            });   
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

            const pet_birth: Date = new Date(update_patient.birth);
            delete update_patient.birth;
            
            return this.prisma.patient.update({
                where: {
                    id: patient_id
                },
                data: {
                    birth: pet_birth,
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
