import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

import { ModifyOptions } from './dto/modify-options.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(): Promise<User[]> {
    const users = await this.usersService.findAll();
    return users;
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':name')
  async findOneByName(@Param('name') name: string): Promise<User> {
    const user = await this.usersService.findOneByName(name);
    return user;
  }

  // @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('modify')
  async modify(@Body() options: ModifyOptions): Promise<Partial<User>> {
    await this.usersService.update(options.id, { name: options.name, email: options.email });
    return options;
  }
}
