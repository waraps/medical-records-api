import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { RolDto } from './dto';
import { RolService } from './rol.service';

@UseGuards(JwtGuard)
@Controller('roles')
export class RolController {
    constructor(private rolService: RolService) {}

    @Post()
    createRol(@Body() new_rol: RolDto) {
        return this.rolService.createRol(new_rol);
    }

    @Get()
    getRoles() {
        return this.rolService.getRoles();
    }

    @Get(':id')
    getRolById(@Param('id', ParseIntPipe) rol_id: number) {
        return this.rolService.getRolById(rol_id);
    }

    @Put(':id')
    editRolById(@Param('id', ParseIntPipe) rol_id: number, @Body() new_rol: RolDto) {
        return this.rolService.editRolById(rol_id, new_rol);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deleteRolById(@Param('id', ParseIntPipe) rol_id: number) {
        return this.rolService.deleteRolById(rol_id);
    }
}
