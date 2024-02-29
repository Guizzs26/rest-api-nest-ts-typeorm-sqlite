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

  delete(user: User): Promise<void>;

  findById(id: string): Promise<User | null>;

  findByName(name: string): Promise<User | null>;

  findByEmail(email: string): Promise<User | null>;
}
