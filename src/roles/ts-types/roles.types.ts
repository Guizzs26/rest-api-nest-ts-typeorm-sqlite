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

export type ListRolesServiceParams = {
  page: number;
  limit: number;
};

export type ShowRoleParams = {
  id: string;
};

export type DeleteRoleParams = {
  id: string;
};
