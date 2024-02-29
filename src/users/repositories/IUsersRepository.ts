import { CreateUserDTO } from '@users/DTO/CreateUserDTO';
import { User } from '@users/entities/User';
import {
  PaginateParams,
  UsersPaginateProperties,
} from '@users/ts-types/users.types';

export interface IUsersRepository {
  create({
    name,
    email,
    password,
    isAdmin,
    role,
  }: CreateUserDTO): Promise<User>;

  save(user: User): Promise<User>;

  findAll({
    page,
    skip,
    take,
  }: PaginateParams): Promise<UsersPaginateProperties>;

  findById(id: string): Promise<User | null>;

  findByName(name: string): Promise<User | null>;

  delete(user: User): Promise<void>;
}
