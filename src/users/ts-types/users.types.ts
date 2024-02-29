import { User } from '@users/entities/user.entity';

export type PaginateParams = {
  page: number;
  skip: number;
  take: number;
};

export type UsersPaginateProperties = {
  per_page: number;
  total: number;
  current_page: number;
  data: User[];
};

export type ListUsersServiceParams = {
  page: number;
  limit: number;
};

export type CreateUserDtoService = {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  roleId: string;
};
