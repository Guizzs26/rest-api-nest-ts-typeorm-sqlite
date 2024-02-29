import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDTO {
  @IsString({ message: 'O campo name deve ser uma string' })
  @IsNotEmpty({ message: 'O campo name não pode estar vazio' })
  readonly name: string;
}
