import { IsString, IsNotEmpty, IsUUID } from 'class-validator';
import { CreateRoleDTO } from './createRoleDTO';

export class UpdateRoleDTO extends CreateRoleDTO {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
