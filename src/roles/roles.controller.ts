import { Body, Controller, Post } from '@nestjs/common';
import { Role } from './entities/role.entity';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  show(@Body() { name }): Role {
    const role = this.rolesService.create({ name });

    return role;
  }
}
