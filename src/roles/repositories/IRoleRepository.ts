import { CreateRoleDTO } from '@roles/DTO/createRoleDTO';
import { PaginateParams, RolesPaginateProperties } from '@roles/ts-types/types';
import { Role } from '@roles/entities/role.entity';

export interface IRolesRepository {
  create({ name }: CreateRoleDTO): Promise<Role>;

  save(role: Role): Promise<Role>;

  delete(role: Role): Promise<void>;

  findAll({
    page,
    skip,
    take,
  }: PaginateParams): Promise<RolesPaginateProperties>;

  findById(id: string): Promise<Role | null>;

  findByName(name: string): Promise<Role | null>;
}
