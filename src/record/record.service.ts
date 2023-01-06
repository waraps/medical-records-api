import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditRecordDto, RecordDto } from './dto';
import { AppointmentStatusConstants } from '../constanst';

@Injectable()
export class RecordService {
    constructor(private prisma: PrismaService) {}

    async createRecord(user_id: number, record: RecordDto) {
        try {

            const newRecord = await this.prisma.record.create({
                data: {
                    patient_id: record.patient_id,
                    created_by: user_id,
                    appointment_id: record.appointment_id,
                },
            });

            await this.prisma.medicalAppointments.update({
                where: {
                    id: record.appointment_id,
                },
                data: {
                    status: AppointmentStatusConstants.IN_PROGRESS,
                },
            });

            await this.prisma.user.update({
                where: {
                    id: user_id,
                },
                data: {
                    openToAppointment: false
                },
            });

            return newRecord;
        } catch (error) {
            throw error;
        }
    }

    async getRecords() {
        try {
            return this.prisma.record.findMany();
        } catch (error) {
            throw error;
        }
    }

    async getRecordById(record_id: number) {
        try {
            return this.prisma.record.findFirst({
                where: {
                    id: record_id,
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async getRecordsByPatientId(patient_id: number) {
        try {
            return this.prisma.record.findMany({
                where: {
                    patient_id: patient_id,
                },
            });
        } catch (error) {
            throw error;
        }
    }

    async editRecordById(record_id: number, update_record: EditRecordDto) {
        try {
            const record = await this.prisma.record.findUnique({
                where: {
                    id: record_id
                }
            });

            if(!record) {
                throw new ForbiddenException('Record does not exists');
            }

            return this.prisma.record.update({
                where: {
                    id: record_id
                },
                data: {
                    ...update_record
                },
            });
        } catch (error) {
            throw error;
        }
    }

    async deleteRecordById(record_id: number) {
        try {
            const record = await this.prisma.record.findUnique({
                where: {
                    id: record_id
                }
            });

            if(!record) {
                throw new ForbiddenException('Record does not exists');
            }

            await this.prisma.record.delete({
                where: {
                    id: record_id,
                }
            });
        } catch (error) {
            throw error;
        }
    }
}
