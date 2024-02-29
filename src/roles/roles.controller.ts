import {
  Controller,
  Body,
  Query,
  Param,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { Role } from './entities/role.entity';
import { RolesService } from './roles.service';
import { CreateRoleDTO } from '@roles/DTO/CreateRoleDTO';
import { RolesPaginateProperties } from './ts-types/roles.types';
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async store(@Body() { name }: CreateRoleDTO): Promise<Role> {
    const role = this.rolesService.create({ name });

    return role;
  }

  @Get()
  async index(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 15,
  ): Promise<RolesPaginateProperties> {
    // Se page ou limit não forem números válidos, o NestJS atribuirá seus valores padrão (1 e 15, respectivamente)
    const rolesPagination = await this.rolesService.findAll({ page, limit });

    return rolesPagination;
  }

  @Get(':id')
  async show(@Param('id') id: string): Promise<Role> {
    const role = await this.rolesService.findOne({ id });

    return role;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() { name }: CreateRoleDTO,
  ): Promise<Role> {
    const role = await this.rolesService.update({ id, name });

    return role;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<object> {
    await this.rolesService.delete({ id });

    return {
      message: 'Role deleted',
    };
  }
}
