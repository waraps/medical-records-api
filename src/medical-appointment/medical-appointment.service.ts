import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { MedicalAppointmentDto } from './dto';
import { AppointmentStatusConstants } from '../constanst';

@Injectable()
export class MedicalAppointmentService {
    constructor(private prisma: PrismaService) {}

    async createAppointment(appointment: MedicalAppointmentDto) {
        try {

            const patient = await this.prisma.patient.findUnique({
                where: {
                    id: appointment.patient_id
                }
            });

            if(!patient) {
                throw new ForbiddenException('Patient does not exists');
            }

            const existAppointment = await this.prisma.medicalAppointments.findFirst({
                where: {
                    status: AppointmentStatusConstants.WAITING || AppointmentStatusConstants.IN_PROGRESS,
                    patient_id: appointment.patient_id,
                }
            })

            if (existAppointment) {
                throw new ForbiddenException('Patient is in an appointment already');
            }

            const newAppointment = await this.prisma.medicalAppointments.create({
                data: {
                    status: appointment.status,
                    patient_id: appointment.patient_id,
                    doctor_id: appointment.doctor_id,
                }
            });

            await this.prisma.patient.update({
                where: {
                    id: appointment.patient_id
                },
                data: {
                    in_room: true,
                },
            });

            return newAppointment;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if(error.code === 'P2002') {
                    throw new ForbiddenException('Sex already exists');
                }
            }
            throw error;
        }
    }

    async getAppointments() {
        try {
            return this.prisma.medicalAppointments.findMany({
                select: {
                    id: true,
                    status: true,
                    patient_id: true,
                    patient: true,
                    doctor_id: true,
                    doctor: true,
                    createdAt: true,
                    updatedAt: true,
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async getAppointmentsByDoctor(doctor_id: number) {
        try {
            return this.prisma.medicalAppointments.findMany({
                where: {
                    OR: [
                        { doctor_id: doctor_id },
                        { doctor_id: null }
                    ],
                },
                select: {
                    id: true,
                    status: true,
                    patient_id: true,
                    patient: true,
                    doctor_id: true,
                    doctor: true,
                    createdAt: true,
                    updatedAt: true,
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async getAppointmentById(appointment_id: number) {
        try {
            return this.prisma.medicalAppointments.findFirst({
                where: {
                    id: appointment_id,
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async getCurrtentAppointment(doctor_id: number) {
        try {
            return this.prisma.medicalAppointments.findFirst({
                where: {
                    status: AppointmentStatusConstants.IN_PROGRESS,
                    doctor_id: doctor_id,
                },
                select: {
                    id: true,
                    status: true,
                    patient: {
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
                            owner: true,
                            created_by: true,
                            user: true,
                            avatar: true,
                            in_room: true,
                            createdAt: true,
                        }
                    },
                    doctor: true,
                    record: true,
                    createdAt: true,
                    updatedAt: true,
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async editAppointmentById(appointment_id: number, new_appointment: MedicalAppointmentDto) {
        try {
            const appointment = await this.prisma.medicalAppointments.findUnique({
                where: {
                    id: appointment_id
                }
            });

            if(!appointment) {
                throw new ForbiddenException('Medical appointment does not exists');
            }

            return this.prisma.medicalAppointments.update({
                where: {
                    id: appointment_id,
                },
                data: {
                    ...new_appointment,
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async deleteAppointmentById(appointment_id: number) {
        try {
            const appointment = await this.prisma.medicalAppointments.findUnique({
                where: {
                    id: appointment_id
                }
            });

            if(!appointment) {
                throw new ForbiddenException('Medical appointment does not exists');
            }

            await this.prisma.medicalAppointments.delete({
                where: {
                    id: appointment_id,
                }
            });
        } catch (error) {
            throw error;
        }
    }
}
