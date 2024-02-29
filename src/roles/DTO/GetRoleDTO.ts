import { IsOptional, IsInt, Min } from 'class-validator';

export class GetRoleDTO {
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number;
}
