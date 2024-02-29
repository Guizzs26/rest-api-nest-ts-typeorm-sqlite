import { Controller, Body, Query, Get, Post } from '@nestjs/common';
import { Role } from './entities/role.entity';
import { RolesService } from './roles.service';
import { CreateRoleDTO } from './DTO/createRoleDTO';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async store(@Body() { name }: CreateRoleDTO): Promise<Role> {
    const role = this.rolesService.create({ name });

    return role;
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 15,
  ): Promise<Role[]> {
    // Se page ou limit não forem números válidos, o NestJS atribuirá seus valores padrão (1 e 15, respectivamente)
    const { data } = await this.rolesService.findAll({ page, limit });

    return data;
  }
}
