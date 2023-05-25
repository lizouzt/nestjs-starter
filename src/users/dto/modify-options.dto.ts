import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsAscii, IsEmail, IsOptional, MinLength } from 'class-validator';

import { User } from '../users.entity';

@InputType()
export class ModifyOptions implements Partial<User> {
  @ApiProperty()
  @IsAlphanumeric()
  @Field()
  readonly id: number;

  @ApiProperty()
  @Field()
  @IsAlphanumeric()
  @MinLength(1)
  readonly name: string;

  @ApiProperty()
  @Field()
  @IsEmail()
  @MinLength(1)
  readonly email: string;

  @ApiProperty()
  @Field()
  @IsOptional()
  @IsAscii()
  @MinLength(8)
  readonly password: string;
}
