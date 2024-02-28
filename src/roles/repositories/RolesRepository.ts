import { Injectable } from '@nestjs/common';
import { Role } from '@roles/entities/role.entity';
import { CreateRoleDTO } from '@roles/DTO/createRoleDTO';

const roles: Role[] = [];

@Injectable()
export class RolesRepository {
  private roles: Role[];

  constructor() {
    this.roles = [];
  }

  create({ name }: CreateRoleDTO): Role {
    const role = new Role();

    Object.assign(role, {
      name,
      created_at: new Date(),
    });

    roles.push(role);

    return role;
  }

  findAll(): Role[] {
    return this.roles;
  }

  findByName(name: string): Role | undefined {
    const role = this.roles.find((role) => role.name === name);

    return role;
  }
}
