import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe,ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service'
import { createUserDto } from './Dto/create-user-dto'
import { updateUserDto } from './Dto/update-user-dto'

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) { }

    @Get()
    findAll(@Query('role') role?: "ADMIN" | "ENGINEER" | "INTERN") {
        return this.userService.findAll(role)
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {

        return this.userService.findOne(id)
    }

    @Post()
    createUser(@Body(ValidationPipe) users: createUserDto) {

        return this.userService.createUser(users)
    }

    @Patch(':id')
    updateUser(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateUser: updateUserDto) {

        return this.userService.updateUser(+id, updateUser)
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.Delete(id)
    }
}
