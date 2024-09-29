import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['events'] });
  }

  create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  findOne(id: number): Promise<User> {
    // return this.userRepository.findOne(id, { relations: ['events'] });
    return this.userRepository.findOne(id as any);
  }
}
