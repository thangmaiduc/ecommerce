import { Public } from './../../common/IsPublic.decorator';
import { AuthService } from './../services/auth.service';
import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthDto } from '../dto/auth.dto';
@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}
