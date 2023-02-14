import { Public } from './../../common/IsPublic.decorator';
import { JwtAuthGuard } from './../jwt.auth-guard';
import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
// @UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  @Public()
  createUser() {
    return this.usersService.createUser();
  }

  @Get('profile')
  async getProfile(@Req() req: any) {
    return req.user;
  }
}
