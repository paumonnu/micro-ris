import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestController } from '@/src/crud/test.controller';
import { TestService } from '@/src/crud/test.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController, TestController],
  providers: [UsersService, TestService],
})
export class UsersModule {}
