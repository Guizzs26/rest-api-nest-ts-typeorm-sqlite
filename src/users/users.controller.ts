import { Controller, Body, Post, Get, Query, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './DTO/CreateUserDTO';
import { User } from './entities/user.entity';
import { UsersPaginateProperties } from './ts-types/users.types';
import { GetUserDTO } from './DTO/GetUsersDTO';

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
    @Query() { limit = 15, page = 1 }: GetUserDTO,
  ): Promise<UsersPaginateProperties> {
    const usersPagination = await this.usersService.findAll({ limit, page });

    return usersPagination;
  }
}
