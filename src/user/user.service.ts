import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditUserDto, UserDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async createUser(user: UserDto) {
        try {
            const hash = await argon.hash(user.password);

            const newUser = await this.prisma.user.create({
                data: {
                    email: user.email,
                    password: hash,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    dni: user.dni,
                    avatar: user.avatar || 'https://cdn-icons-png.flaticon.com/512/666/666201.png',
                    rol_id: user.rol_id,
                },
            });

            delete newUser.password;
            return newUser;

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if(error.code === 'P2002') {
                    throw new ForbiddenException('Credentials taken');
                }
            }
            throw error;
        }
    }

    async getUsers() {
        try {
            return this.prisma.user.findMany({
                select: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    dni: true,
                    email: true,
                    rol_id: true,
                    createdAt: true,
                    updatedAt: true,
                    avatar: true,
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async getDoctorsAvailables() {
        try {
            return this.prisma.user.findMany({
                where: {
                    rol_id: 2,
                },
                select: {
                    id: true,
                    last_name: true,
                    first_name: true,
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async getUserById(user_id: number) {
        try {
            return this.prisma.user.findFirst({
                where: {
                    id: user_id,
                },
                select: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    dni: true,
                    email: true,
                    rol_id: true,
                    createdAt: true,
                    updatedAt: true,
                    avatar: true,
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async editUser(user_id: number, update_user: EditUserDto) {
        try {
            const userExist = await this.prisma.user.findUnique({
                where: {
                    id: user_id
                }
            });

            if(!userExist) {
                throw new ForbiddenException('User does not exists');
            }

            const user = await this.prisma.user.update({
                where: {
                    id: user_id
                },
                data: {
                    ...update_user
                },
            });

            delete user.password;

            return user;
        } catch (error) {
            throw error;
        }
    }

    async deleteUserById(user_id: number) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    id: user_id
                }
            });

            if(!user) {
                throw new ForbiddenException('User does not exists');
            }

            await this.prisma.user.delete({
                where: {
                    id: user_id,
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async getAdminStats() {
        try {
            const usersCount: number = await this.prisma.user.count();
            const patientsCount: number = await this.prisma.patient.count();
            const ownersCount: number = await this.prisma.owner.count();
            const testsCount: number = await this.prisma.test.count();
            const patientInRoomCount: number = await this.prisma.medicalAppointments.count();

            return {
                usersCount,
                patientsCount,
                ownersCount,
                testsCount,
                patientInRoomCount,
            }

        } catch (error) {
            throw error;
        }
    }
}
