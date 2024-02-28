import { Role } from '@roles/entities/role.entity';

const roles: Role[] = [];

type createRoleDto = {
  name: string;
};

export class RolesRepository {
  private roles: Role[];

  constructor() {
    this.roles = [];
  }

  create({ name }: createRoleDto): Role {
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
    return this.roles.find((role) => role.name === name);
  }
}
