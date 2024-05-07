import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto';
// import users from '../user.json';
const users = require('../user.json')


import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  signInLocal(dto: AuthDto) {
    // retrieve user

    const user = users.find((_user) => _user.email === dto.email);

    if (!user) throw new UnauthorizedException('User does not Exist');
    if (user.password !== dto.password)
      throw new UnauthorizedException('Incorrect Credentials');

    return this.signUser(user.id, user.email, 'user');
  }
  signUpLocal(dto: AuthDto) {}

  signUser(userId: number, email: string, type: string) {
    return this.jwtService.sign({
      sub: userId,
      email,
      claim: type,
    });
  }
}
