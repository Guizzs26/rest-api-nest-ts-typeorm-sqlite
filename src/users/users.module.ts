import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './repositories/UsersRepository';
import { User } from './entities/User';
import { RolesRepository } from '@roles/repositories/RolesRepository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    { provide: 'IUsersRepository', useClass: UsersRepository },
    { provide: 'IRolesRepository', useClass: RolesRepository },
  ],
  exports: [],
})
export class UsersModule {}
