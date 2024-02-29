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
import { GetRoleDTO } from './DTO/GetRoleDTO';
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
    @Query() { limit = 15, page = 1 }: GetRoleDTO,
  ): Promise<RolesPaginateProperties> {
    const rolesPagination = await this.rolesService.findAll({ limit, page });

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
