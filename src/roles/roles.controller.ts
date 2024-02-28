import { Body, Controller, Get, Post } from '@nestjs/common';
import { Role } from './entities/role.entity';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  store(@Body() { name }): Role {
    const role = this.rolesService.create({ name });

    return role;
  }

  @Get()
  index(): Role[] {
    const roles = this.rolesService.findAll();

    return roles;
  }
}
