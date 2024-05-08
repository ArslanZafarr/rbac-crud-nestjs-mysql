import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [JwtModule.register({
    secret : 'topSecret51',
  }),
  
  PassportModule.register({ defaultStrategy: 'jwt' }),
  TypeOrmModule.forFeature([User]),
],
  controllers: [AuthController],
  providers: [AuthService , JwtStrategy],
})
export class AuthModule {}


