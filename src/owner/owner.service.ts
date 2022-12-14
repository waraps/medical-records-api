import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditOwnerDto, OwnerPetDto } from './dto';

@Injectable()
export class OwnerService {
    constructor(private prisma: PrismaService) {}

    async createOwner(user_id: number, ownerPet: OwnerPetDto) {
        try {
            const owner = await this.prisma.owner.findUnique({
                where: {
                    dni: ownerPet.dni
                }
            });

            if(owner) {
                throw new ForbiddenException('Owner already exists');
            }

            const newOwner = await this.prisma.owner.create({
                data: {
                    first_name: ownerPet.first_name,
                    last_name: ownerPet.last_name,
                    dni: ownerPet.dni,
                    phone: ownerPet.phone,
                    address: ownerPet.address,
                    email: ownerPet.email,
                    occupation: ownerPet.occupation,
                    housing: ownerPet.housing,
                    other_pets: ownerPet.other_pets,
                    avatar: 'https://i.ibb.co/C2Vw01w/galenos.png'
                }
            });

            const pet_birth: Date = new Date(ownerPet.birth);

            await this.prisma.patient.create({
                data: {
                    specie: ownerPet.specie,
                    race: ownerPet.race,
                    name: ownerPet.name,
                    birth: pet_birth,
                    color: ownerPet.color,
                    sex_id: ownerPet.sex_id,
                    neutered: ownerPet.neutered,
                    owner_id: newOwner.id,
                    created_by: user_id,
                    avatar: "https://cdn-icons-png.flaticon.com/512/21/21645.png",
                },
            });

            return newOwner;
        } catch (error) {
            throw error;
        }
    }

    async getOwners() {
        try {
            return this.prisma.owner.findMany();
        } catch (error) {
            throw error;
        }
    }

    async getOwnerById(owner_id: number) {
        try {
            return this.prisma.owner.findFirst({
                where: {
                    id: owner_id,
                },
                select: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    dni: true,
                    phone: true,
                    address: true,
                    email: true,
                    occupation: true,
                    housing: true,
                    other_pets: true,
                    avatar: true,
                    pets: {
                        select: {
                            id: true,
                            specie: true,
                            race: true,
                            name: true,
                            birth: true,
                            color: true,
                            avatar: true,
                        }
                    },
                    createdAt: true,
                    updatedAt: true,
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async getOwnerByDNI(dni: string) {
        try {
            return this.prisma.owner.findFirst({
                where: {
                    dni,
                },
                select: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    dni: true,
                    phone: true,
                    address: true,
                    email: true,
                    occupation: true,
                    housing: true,
                    other_pets: true,
                    avatar: true,
                    pets: {
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
                    },
                    createdAt: true,
                    updatedAt: true,
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async editOwnerById(owner_id: number, update_owner: EditOwnerDto) {
        try {
            const owner = await this.prisma.owner.findUnique({
                where: {
                    id: owner_id
                }
            });

            if(!owner) {
                throw new ForbiddenException('Owner does not exists');
            }

            return this.prisma.owner.update({
                where: {
                    id: owner_id
                },
                data: {
                    ...update_owner
                },
            });
        } catch (error) {
            throw error;
        }
    }

    async deleteOwnerById(owner_id: number) {
        try {
            const owner = await this.prisma.owner.findUnique({
                where: {
                    id: owner_id
                }
            });

            if(!owner) {
                throw new ForbiddenException('Owner does not exists');
            }

            await this.prisma.owner.delete({
                where: {
                    id: owner_id,
                }
            });
        } catch (error) {
            throw error;
        }
    }
}
