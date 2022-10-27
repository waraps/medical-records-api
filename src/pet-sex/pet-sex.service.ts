import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { PetSexDto } from './dto';

@Injectable()
export class PetSexService {
    constructor(private prisma: PrismaService) {}

    async createPetSex(sex: PetSexDto) {
        try {
            const newSex = await this.prisma.petSex.create({
                data: {
                    name: sex.name,
                }
            });
    
            return newSex;   
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if(error.code === 'P2002') {
                    throw new ForbiddenException('Sex already exists');
                }
            }
            throw error;
        }
    }

    async getPetSexes() {
        try {
            return this.prisma.petSex.findMany();
        } catch (error) {
            throw error;
        }
    }

    async getPetSexById(sex_id: number) {
        try {
            return this.prisma.petSex.findFirst({
                where: {
                    id: sex_id,
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async editPetSexById(sex_id: number, new_sex: PetSexDto) {
        try {
            const sex = await this.prisma.petSex.findUnique({
                where: {
                    id: sex_id
                }
            });
    
            if(!sex) {
                throw new ForbiddenException('Sex does not exists');
            }
    
            return this.prisma.petSex.update({
                where: {
                    id: sex_id,
                },
                data: {
                    ...new_sex,
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async deletePetSexById(sex_id: number) {
        try {
            const sex = await this.prisma.petSex.findUnique({
                where: {
                    id: sex_id
                }
            });
    
            if(!sex) {
                throw new ForbiddenException('Sex does not exists');
            }
    
            await this.prisma.petSex.delete({
                where: {
                    id: sex_id,
                }
            });
        } catch (error) {
            throw error;
        }
    }
}
