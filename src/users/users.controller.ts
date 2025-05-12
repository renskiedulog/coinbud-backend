import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return 'This action returns a user by ID';
  }

  @Patch(':id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() userUpdate: any) {
    return `This action updates a user with ID ${id}`;
  }

  @Get()
  getSupabaseUsers() {
    const users = this.usersService.getSupabaseUsers();
    return users;
  }
}
