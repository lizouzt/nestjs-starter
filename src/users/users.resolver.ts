import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { GqlAuthGuard } from '../auth/gql-auth.guard';

import { User } from './users.entity';
import { UsersService } from './users.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation((returns) => User)
  async userModify(
    @Args('id') id: number,
    @Args('name') name: string, 
    @Args('email') email: string,
  ): Promise<Partial<User>>{
    const result = await this.usersService.update(id, { name, email });
    return { id, name, email };
  }

  @UseGuards(GqlAuthGuard)
  @Query((returns) => [User])
  async users(): Promise<User[]> {
    const users = await this.usersService.findAll();
    return users;
  }

  @UseGuards(GqlAuthGuard)
  @Query((returns) => User)
  async user(@Args('name') name: string): Promise<User> {
    const user = await this.usersService.findOneByName(name);
    return user;
  }
}
