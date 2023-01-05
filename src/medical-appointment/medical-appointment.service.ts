import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { MedicalAppointmentDto } from './dto';

enum AppointmentStatusConstants {
    WAITING = 'waiting',
    IN_PROGRESS = 'in progress',
    FINISHED = 'finished',
}

@Injectable()
export class MedicalAppointmentService {
    constructor(private prisma: PrismaService) {}

    async createAppointment(appointment: MedicalAppointmentDto) {
        try {

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
                    doctor_id: doctor_id || null,
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
