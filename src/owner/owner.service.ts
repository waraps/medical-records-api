import { ForbiddenException, Injectable } from '@nestjs/common';
import { PatientDto } from 'src/patient/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditOwnerDto, OwnerDto } from './dto';

@Injectable()
export class OwnerService {
    constructor(private prisma: PrismaService) {}

    async createOwner(user_id: number, owner: OwnerDto, patient: PatientDto) {
        try {

            const newOwner = await this.prisma.owner.create({
                data: {
                    first_name: owner.first_name,
                    last_name: owner.last_name,
                    dni: owner.dni,
                    phone: owner.phone,
                    address: owner.address,
                    email: owner.email,
                    occupation: owner.occupation,
                    housing: owner.housing,
                    other_pets: owner.other_pets,
                    avatar: owner.avatar || 'https://cdn-icons-png.flaticon.com/512/666/666201.png'
                }
            });

            const pet_birth: Date = new Date(patient.birth);

            await this.prisma.patient.create({
                data: {
                    specie: patient.specie,
                    race: patient.race,
                    name: patient.name,
                    birth: pet_birth,
                    color: patient.color,
                    sex_id: patient.sex_id,
                    neutered: patient.neutered,
                    owner_id: newOwner.id,
                    created_by: user_id,
                    avatar: patient.avatar || "https://cdn-icons-png.flaticon.com/512/21/21645.png",
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

    async getOwnerById(owner_id: number, withPets: boolean) {
        try {
            if(withPets) {
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
                        pets: true,
                        createdAt: true,
                        updatedAt: true,
                    }
                });
            }
            
            return this.prisma.owner.findFirst({
                where: {
                    id: owner_id,
                },
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
