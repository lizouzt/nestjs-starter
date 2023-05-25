import { Field, ObjectType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

import { User } from '../../users/users.entity';

@ObjectType()
export class SignInResult extends User {
  @Field()
  @IsOptional()
  message?: string = ''

  @Field()
  readonly token: string;

  constructor(msg: string) {
    super()

    this.message = msg
  }
}
