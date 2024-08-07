import { Role } from '@roles/entities/role.entity';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  IsUUID,
} from 'class-validator';

export class CreateUserDTO {
  @IsString({ message: 'O campo name deve ser uma string' })
  @IsNotEmpty({ message: 'O campo name não pode estar vazio' })
  name: string;

  @IsString({ message: 'O campo email deve ser uma string' })
  @IsNotEmpty({ message: 'O campo email não pode estar vazio' })
  @IsEmail({}, { message: 'O email deve ser um endereço de e-mail válido' })
  email: string;

  @IsString({ message: 'O campo password deve ser uma string' })
  @IsNotEmpty({ message: 'O campo password não pode estar vazio' })
  @IsStrongPassword({
    minLength: 8,
  })
  password: string;

  @IsBoolean({ message: 'O campo isAdmin deve ser um booleano' })
  @IsNotEmpty({ message: 'O campo password não pode estar vazio' })
  isAdmin: boolean;

  @IsUUID()
  @IsString({ message: 'O campo roleId deve ser uma string' })
  @IsNotEmpty({ message: 'O campo roleId não pode estar vazio' })
  roleId?: string;

  role?: Role;
}
