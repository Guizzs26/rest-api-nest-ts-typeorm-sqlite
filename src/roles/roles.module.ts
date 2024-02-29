import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesController } from '@roles/roles.controller';
import { RolesService } from '@roles/roles.service';
import { RolesRepository } from '@roles/repositories/RolesRepository';
import { Role } from '@roles/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RolesController],
  providers: [
    RolesService,
    { provide: 'IRolesRepository', useClass: RolesRepository },
  ],
  exports: ['IRolesRepository'],
})
export class RolesModule {}
