import { Body, Controller, Post } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

const roles = [];

@Controller('roles')
export class RolesController {
  @Post()
  create(@Body() { name }) {
    const role = {
      id: uuidv4(),
      name,
      created_at: new Date(),
    };

    roles.push(role);

    return role;
  }
}
