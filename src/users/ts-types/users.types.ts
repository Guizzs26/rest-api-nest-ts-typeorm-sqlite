import { User } from '@users/entities/User';

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
