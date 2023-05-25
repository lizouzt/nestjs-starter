import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, MinLength } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field({ description: '用户名' })
  @MinLength(6, { message: '用户名最少6个字符' })
  @IsNotEmpty({ message: '用户名不能为空' })
  @Index({ unique: true })
  @Column()
  name: string;

  @Field({ description: '注册邮箱' })
  @Index({ unique: true })
  @Column()
  email: string;

  @Exclude({ toPlainOnly: true })
  @MinLength(6, { message: '密码最少6个字符' })
  @IsNotEmpty({ message: '密码不能为空' })
  @Column()
  password: string;

  @Field()
  @CreateDateColumn()
  readonly createdAt: Date;

  @Field()
  @UpdateDateColumn()
  readonly updatedAt: Date;

  @Field((type) => Int)
  @VersionColumn()
  readonly version: number;
}
