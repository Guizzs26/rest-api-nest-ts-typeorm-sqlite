import { Controller, Body, Post, Get, Query, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './DTO/CreateUserDTO';
import { User } from './entities/User';
import { UsersPaginateProperties } from './ts-types/users.types';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async store(
    @Body() { name, email, password, isAdmin, roleId }: CreateUserDTO,
  ): Promise<User> {
    const user = await this.usersService.create({
      name,
      email,
      password,
      isAdmin,
      roleId,
    });

    return user;
  }

  @Get()
  async index(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 15,
  ): Promise<UsersPaginateProperties> {
    const usersPagination = await this.usersService.findAll({ page, limit });

    return usersPagination;
  }
}
