import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { EditUserDto, UserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('me')
    getMe(@GetUser() user: User) {
        return user;
    }

    @Patch('me')
    editUser(@GetUser('id') user_id: number, @Body() update_user: EditUserDto) {
        return this.userService.editUser(user_id, update_user);
    }

    @Post()
    createUser(@Body() user: UserDto) {
        return this.userService.createUser(user);
    }

    @Get()
    getUsers() {
        return this.userService.getUsers();
    }

    @Get('/doctors')
    getDoctorsAvailables() {
        return this.userService.getDoctorsAvailables();
    }

    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) user_id: number) {
        return this.userService.getUserById(user_id);
    }

    @Put(':id')
    editUserById(@Param('id', ParseIntPipe) user_id: number, @Body() update_user: EditUserDto) {
        return this.userService.editUser(user_id, update_user);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deleteUserById(@Param('id', ParseIntPipe) user_id: number) {
        return this.userService.deleteUserById(user_id);
    }
}
