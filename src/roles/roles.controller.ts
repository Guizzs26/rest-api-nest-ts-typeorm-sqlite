import { Body, Controller, Get, Post } from '@nestjs/common';
import { Role } from './entities/role.entity';
import { RolesService } from './roles.service';
import { CreateRoleDTO } from './DTO/createRoleDTO';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  store(@Body() { name }: CreateRoleDTO): Role {
    const role = this.rolesService.create({ name });

    return role;
  }

  @Get()
  index(): Role[] {
    const roles = this.rolesService.findAll();

    return roles;
  }
}
