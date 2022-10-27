import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { RolDto } from './dto';

@Injectable()
export class RolService {
    constructor(private prisma: PrismaService) {}

    async createRol(rol: RolDto) {
        try {
            const newRol = await this.prisma.rol.create({
                data: {
                    name: rol.name,
                }
            });
    
            return newRol;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if(error.code === 'P2002') {
                    throw new ForbiddenException('Sex already exists');
                }
            }
            throw error;
        }
    }

    async getRoles() {
        try {
            return this.prisma.rol.findMany();   
        } catch (error) {
            throw error;
        }
    }

    async getRolById(rol_id: number) {
        try {
            return this.prisma.rol.findFirst({
                where: {
                    id: rol_id,
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async editRolById(rol_id: number, new_rol: RolDto) {
        try {
            const rol = await this.prisma.rol.findUnique({
                where: {
                    id: rol_id
                }
            });
    
            if(!rol) {
                throw new ForbiddenException('Rol does not exists');
            }
    
            return this.prisma.rol.update({
                where: {
                    id: rol_id,
                },
                data: {
                    ...new_rol,
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async deleteRolById(rol_id: number) {
        try {
            const rol = await this.prisma.rol.findUnique({
                where: {
                    id: rol_id
                }
            });
    
            if(!rol) {
                throw new ForbiddenException('Rol does not exists');
            }
    
            await this.prisma.rol.delete({
                where: {
                    id: rol_id,
                }
            });
        } catch (error) {
            throw error;
        }
    }
}
