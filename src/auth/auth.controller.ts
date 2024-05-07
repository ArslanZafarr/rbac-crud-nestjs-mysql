import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('local/signin')
  signInLocal(@Body() dto: AuthDto) {
    return this.authService.signInLocal(dto);
  }

  @Post('local/signup')
  signUpLocal(@Body() dto: AuthDto) {
   return  this.authService.signUpLocal(dto);
  }
}
