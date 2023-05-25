import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async update(id: number, options: Partial<User>): Promise<UpdateResult> {
    const result = await this.usersRepo.update(id, options);
    return result;
  }

  async findAll(): Promise<User[]> {
    const users = await this.usersRepo.find();
    return users;
  }

  async findOneByName(name: string): Promise<User> {
    const user = await this.usersRepo.findOne({ name });
    return user;
  }
}
