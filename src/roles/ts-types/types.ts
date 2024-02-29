import { Role } from '@roles/entities/role.entity';

export type PaginateParams = {
  page: number;
  skip: number;
  take: number;
};

export type RolesPaginateProperties = {
  per_page: number;
  total: number;
  current_page: number;
  data: Role[];
};

export type ShowRoleParams = {
  id: string;
};

export type DeleteRoleParams = {
  id: string;
};

export type ListRolesUseCaseParams = {
  page: number;
  limit: number;
};
