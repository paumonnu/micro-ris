import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { SerializerModule } from '@/src/serializer/serializer.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), SerializerModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
