import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RolesRepository } from './repositories/RolesRepository';
import { Role } from './entities/role.entity';

type CreateRoleDTO = {
  name: string;
};

@Injectable()
export class RolesService {
  constructor(private readonly rolesRepository: RolesRepository) {}

  create({ name }: CreateRoleDTO): Role {
    const roleAlreadyExists = this.rolesRepository.findByName(name);

    if (roleAlreadyExists) {
      throw new HttpException('Role already exists', HttpStatus.CONFLICT);
    }

    return this.rolesRepository.create({ name });
  }
}
