import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { Role } from './entities/role.entity';
import { RolesRepository } from './repositories/RolesRepository';

const rolesRepository = new RolesRepository();
@Controller('roles')
export class RolesController {
  @Post()
  create(@Body() { name }): Role {
    const roleAlreadyExists = rolesRepository.findByName(name);

    if (roleAlreadyExists) {
      throw new HttpException('Role already exists', HttpStatus.CONFLICT);
    }

    const role = rolesRepository.create({ name });

    return role;
  }
}
