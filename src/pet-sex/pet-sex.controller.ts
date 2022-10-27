import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { PetSexDto } from './dto';
import { PetSexService } from './pet-sex.service';

@UseGuards(JwtGuard)
@Controller('pet_sex')
export class PetSexController {
    constructor(private petSexService: PetSexService) {}
    
    @Post()
    createPetSex(@Body() new_sex: PetSexDto) {
        return this.petSexService.createPetSex(new_sex);
    }

    @Get()
    getPetSexes() {
        return this.petSexService.getPetSexes();
    }

    @Get(':id')
    getPetSexById(@Param('id', ParseIntPipe) sex_id: number) {
        return this.petSexService.getPetSexById(sex_id);
    }

    @Put(':id')
    editPetSexById(@Param('id', ParseIntPipe) sex_id: number, @Body() new_sex: PetSexDto) {
        return this.petSexService.editPetSexById(sex_id, new_sex);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deletePetSexById(@Param('id', ParseIntPipe) sex_id: number) {
        return this.petSexService.deletePetSexById(sex_id);
    }
}
