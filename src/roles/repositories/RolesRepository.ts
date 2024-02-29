import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDTO } from '@roles/DTO/createRoleDTO';
import { Role } from '@roles/entities/role.entity';
import { skip } from 'node:test';
import { Repository } from 'typeorm';

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

@Injectable()
export class RolesRepository {
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
