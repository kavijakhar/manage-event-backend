import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Make sure User entity is registered here
  controllers: [UserController],
  providers: [UserService],
  exports: [TypeOrmModule], 
})
export class UsersModule {}
