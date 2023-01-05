import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { TestDto } from './dto';

@Injectable()
export class TestService {
    constructor(private prisma: PrismaService) {}

    async createTest(test: TestDto) {
        try {
            const testExist = await this.prisma.test.findUnique({
                where: {
                    name: test.name.toUpperCase()
                }
            });

            if(testExist) {
                throw new ForbiddenException('Test already exists');
            }

            const newTest = await this.prisma.test.create({
                data: {
                    name: test.name.toUpperCase(),
                }
            });

            return newTest;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if(error.code === 'P2002') {
                    throw new ForbiddenException('Test already exists');
                }
            }
            throw error;
        }
    }

    async getTests() {
        try {
            return this.prisma.test.findMany();
        } catch (error) {
            throw error;
        }
    }

    async getTestById(test_id: number) {
        try {
            return this.prisma.test.findFirst({
                where: {
                    id: test_id,
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async editTestById(test_id: number, new_test: TestDto) {
        try {
            const test = await this.prisma.test.findUnique({
                where: {
                    id: test_id
                }
            });

            if(!test) {
                throw new ForbiddenException('Test does not exists');
            }

            return this.prisma.test.update({
                where: {
                    id: test_id,
                },
                data: {
                    ...new_test,
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async deleteTestById(test_id: number) {
        try {
            const test = await this.prisma.test.findUnique({
                where: {
                    id: test_id
                }
            });

            if(!test) {
                throw new ForbiddenException('Test does not exists');
            }

            await this.prisma.test.delete({
                where: {
                    id: test_id,
                }
            });
        } catch (error) {
            throw error;
        }
    }
}
