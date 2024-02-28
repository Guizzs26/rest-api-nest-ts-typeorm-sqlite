import { Body, Controller, Post } from '@nestjs/common';
import { Role } from './entities/role.entity';

const roles: Role[] = [];

@Controller('roles')
export class RolesController {
  @Post()
  create(@Body() { name }): Role {
    const role = new Role();

    Object.assign(role, {
      name,
      created_at: new Date(),
    });

    roles.push(role);

    return role;
  }
}
