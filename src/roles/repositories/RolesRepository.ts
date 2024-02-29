import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateParams, RolesPaginateProperties } from '@roles/ts-types/types';
import { CreateRoleDTO } from '@roles/DTO/CreateRoleDTO';
import { Repository } from 'typeorm';
import { IRolesRepository } from './IRoleRepository';
import { Role } from '@roles/entities/role.entity';

@Injectable()
export class RolesRepository implements IRolesRepository {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  async create({ name }: CreateRoleDTO): Promise<Role> {
    const role = this.rolesRepository.create({ name });

    return this.rolesRepository.save(role);
  }

  async save(role: Role): Promise<Role> {
    return this.rolesRepository.save(role);
  }

  async delete(role: Role): Promise<void> {
    await this.rolesRepository.remove(role);
  }

  async findAll({
    page,
    skip,
    take,
  }: PaginateParams): Promise<RolesPaginateProperties> {
    const [roles, count] = await this.rolesRepository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: roles,
    };

    return result;
  }

  async findById(id: string): Promise<Role | null> {
    return this.rolesRepository.findOneBy({ id });
  }

  async findByName(name: string): Promise<Role | null> {
    return this.rolesRepository.findOneBy({ name });
  }
}
