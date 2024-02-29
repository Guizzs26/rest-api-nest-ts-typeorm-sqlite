import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  RolesPaginateProperties,
  RolesRepository,
} from './repositories/RolesRepository';
import { Role } from './entities/role.entity';
import { CreateRoleDTO } from './DTO/createRoleDTO';
import { UpdateRoleDTO } from './DTO/UpdateRoleDTO';

type ShowRoleParams = {
  id: string;
};

type DeleteRoleParams = {
  id: string;
};

type ListRolesUseCaseParams = {
  page: number;
  limit: number;
};

@Injectable()
export class RolesService {
  constructor(private readonly rolesRepository: RolesRepository) {}

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
  }: ListRolesUseCaseParams): Promise<RolesPaginateProperties> {
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
