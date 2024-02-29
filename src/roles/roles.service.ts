import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
  RolesPaginateProperties,
  ShowRoleParams,
  ListRolesServiceParams,
  DeleteRoleParams,
} from './ts-types/roles.types';
import { CreateRoleDTO } from '@roles/DTO/CreateRoleDTO';
import { UpdateRoleDTO } from '@roles/DTO/UpdateRoleDTO';
import { Role } from './entities/role.entity';
import { IRolesRepository } from './repositories/IRoleRepository';

@Injectable()
export class RolesService {
  constructor(
    @Inject('IRolesRepository')
    private readonly rolesRepository: IRolesRepository,
  ) {}

  async create({ name }: CreateRoleDTO): Promise<Role> {
    const roleAlreadyExists = await this.rolesRepository.findByName(name);

    if (roleAlreadyExists) {
      throw new HttpException('Role already exists', HttpStatus.CONFLICT);
    }

    return this.rolesRepository.create({ name });
  }

  async findAll({
    limit,
    page,
  }: ListRolesServiceParams): Promise<RolesPaginateProperties> {
    const take = limit;
    const skip = (Number(page) - 1) * take;

    return this.rolesRepository.findAll({ page, skip, take });
  }

  async findOne({ id }: ShowRoleParams): Promise<Role> {
    const role = await this.rolesRepository.findById(id);

    if (!role) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }

    return role;
  }

  async update({ id, name }: UpdateRoleDTO): Promise<Role> {
    const role = await this.rolesRepository.findById(id);

    if (!role) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }

    const roleWithSameName = await this.rolesRepository.findByName(name);

    if (roleWithSameName && role.name !== roleWithSameName.name) {
      throw new HttpException(
        'Role name not informed or already in use',
        HttpStatus.BAD_REQUEST,
      );
    }

    role.name = name;

    await this.rolesRepository.save(role);

    return role;
  }

  async delete({ id }: DeleteRoleParams): Promise<void> {
    const role = await this.rolesRepository.findById(id);

    if (!role) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }

    await this.rolesRepository.delete(role);
  }
}
