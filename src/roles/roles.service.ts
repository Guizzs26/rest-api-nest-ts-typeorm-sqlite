import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  RolesPaginateProperties,
  RolesRepository,
} from './repositories/RolesRepository';
import { Role } from './entities/role.entity';

type CreateRoleDTO = {
  name: string;
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
}
