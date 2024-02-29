import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IUsersRepository } from './repositories/IUsersRepository';
import { IRolesRepository } from '@roles/repositories/IRoleRepository';
import { hash } from 'bcrypt';
import {
  CreateUserDtoService,
  ListUsersServiceParams,
  UsersPaginateProperties,
} from './ts-types/users.types';
import { User } from './entities/User';

@Injectable()
export class UsersService {
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: IUsersRepository,

    @Inject('IRolesRepository')
    private readonly rolesRepository: IRolesRepository,
  ) {}

  async create({
    name,
    email,
    password,
    isAdmin,
    roleId,
  }: CreateUserDtoService): Promise<User> {
    const emailExists = await this.usersRepository.findByEmail(email);

    if (emailExists) {
      throw new HttpException(
        'Email adress already used',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!roleId) {
      throw new HttpException('Invalid role provided', HttpStatus.BAD_REQUEST);
    }

    const role = await this.rolesRepository.findById(roleId);

    if (!role) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }

    const hashedPassword = await hash(password, 10);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      isAdmin,
      role,
    });

    return user;
  }

  async findAll({
    limit,
    page,
  }: ListUsersServiceParams): Promise<UsersPaginateProperties> {
    const take = limit;

    const skip = (Number(page) - 1) * take;

    return this.usersRepository.findAll({ page, skip, take });
  }
}
