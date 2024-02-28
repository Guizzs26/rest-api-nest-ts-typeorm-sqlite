import { Module } from '@nestjs/common';
import { RolesModule } from '@roles/roles.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateRolesTable1709148513121 } from '@shared/typeorm/migrations/1709148513121-CreateRolesTable';
import { Role } from '@roles/entities/role.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './db.sqlite',
      entities: [Role],
      migrations: [CreateRolesTable1709148513121],
      synchronize: true,
      migrationsRun: true,
    }),
    RolesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
