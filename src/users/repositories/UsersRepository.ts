import { Injectable } from '@nestjs/common';
import { IUsersRepository } from './IUsersRepository';
import { CreateUserDTO } from '@users/DTO/CreateUserDTO';
import { User } from '@users/entities/User';
import {
  PaginateParams,
  UsersPaginateProperties,
} from '@users/ts-types/users.types';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create({
    name,
    email,
    password,
    isAdmin,
    role,
  }: CreateUserDTO): Promise<User> {
    const user = this.usersRepository.create({
      name,
      email,
      password,
      isAdmin,
      role,
    });

    return this.usersRepository.save(user);
  }

  async save(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  async findAll({
    page,
    skip,
    take,
  }: PaginateParams): Promise<UsersPaginateProperties> {
    const [users, count] = await this.usersRepository
      .createQueryBuilder('r')
      .leftJoinAndSelect('r.role', 'role') // pegar um dado relacionado e atribuir no alias
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: users,
    };

    return result;
  }

  async findById(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async findByName(name: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ name });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async delete(user: User): Promise<void> {
    await this.usersRepository.remove(user);
  }
}
