import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateRoleDTO } from './createRoleDTO';

export class UpdateRoleDTO extends CreateRoleDTO {
  @IsUUID()
  @IsNotEmpty({ message: 'O campo id não pode estar vazio' })
  id: string;
}
