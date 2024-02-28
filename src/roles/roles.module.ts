import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { RolesRepository } from './repositories/RolesRepository';

@Module({
  imports: [],
  controllers: [RolesController],
  providers: [RolesService, RolesRepository],
  exports: [],
})
export class RolesModule {}
