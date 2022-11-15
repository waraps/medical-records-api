import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { PatientDto } from 'src/patient/dto';
import { EditOwnerDto, OwnerDto } from './dto';
import { OwnerService } from './owner.service';

@UseGuards(JwtGuard)
@Controller('owners')
export class OwnerController {
    constructor(private ownerService: OwnerService) {}

    @Post()
    createOwner(@GetUser('id') user_id: number, @Body() owner: OwnerDto, @Body() patient: PatientDto ) {
        return this.ownerService.createOwner(user_id, owner, patient);
    }

    @Get()
    getOwners() {
        return this.ownerService.getOwners();
    }

    @Get(':id')
    getOwnerById(@Param('id', ParseIntPipe) patient_id: number, withPets = false) {
        return this.ownerService.getOwnerById(patient_id, withPets);
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
