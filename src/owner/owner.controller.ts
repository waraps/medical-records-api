import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { EditOwnerDto, OwnerPetDto } from './dto';
import { OwnerService } from './owner.service';

@UseGuards(JwtGuard)
@Controller('owners')
export class OwnerController {
    constructor(private ownerService: OwnerService) {}

    @Post()
    createOwner(@GetUser('id') user_id: number, @Body() ownerPet: OwnerPetDto) {
        return this.ownerService.createOwner(user_id, ownerPet);
    }

    @Get()
    getOwners() {
        return this.ownerService.getOwners();
    }

    @Get(':id')
    getOwnerById(@Param('id', ParseIntPipe) owner_id: number, withPets = false) {
        return this.ownerService.getOwnerById(owner_id, withPets);
    }

    @Get('/dni/:dni')
    getOwnerByDNI(@Param('dni') dni: string) {
        return this.ownerService.getOwnerByDNI(dni);
    }

    @Put(':id')
    editOwnerById(@Param('id', ParseIntPipe) owner_id: number, @Body() update_owner: EditOwnerDto) {
        return this.ownerService.editOwnerById(owner_id, update_owner);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deleteOwnerById(@Param('id', ParseIntPipe) owner_id: number) {
        return this.ownerService.deleteOwnerById(owner_id);
    }
}
