import { Injectable, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({ where: { email } });

    if (user && (await this.comparePassword(password, user.password))) {
      return user;
    }

    return null;
  }

  async login(user: User): Promise<{ id: number; email: string; success: boolean; message: string; token?: string }> {
    if (!user) {
      throw new Error('User is not provided');
    }
  
    const userWithRoles = await this.usersRepository.findOneOrFail({
      where: { id: user.id },
      relations: ['roles'],
    });
  
    const roles = userWithRoles.roles.map((role) => role.name);
  
    const payload: JwtPayload = {
      sub: user.id,
      username: user.email,
      roles: roles,
    };
  
    const token = this.jwtService.sign(payload);
  
    return {
      id: user.id,
      email: user.email,
      success: true,
      message: 'Login successful',
      token: token,
    };
  }

  async register(userData: Partial<User>): Promise<{ id: number; email: string; success: boolean; message: string }> {
    const { email, password } = userData;
    const existingUser = await this.usersRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('This email is already registered.');
    }

    const hashedPassword = await this.hashPassword(password);
    const newUser = this.usersRepository.create({ email, password: hashedPassword });
    await this.usersRepository.save(newUser);

    return {
      id: newUser.id,
      email: newUser.email,
      success: true,
      message: 'Registration successful',
    };
  }

  async getUserRoles(userId: number): Promise<string[]> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['roles'],
    });
    
    if (user) {
      return user.roles.map((role) => role.name);
    } else {
      return [];
    }
  }

  async logout(): Promise<{ success: boolean; message: string }> {
    // Implement logout logic here if needed, such as token invalidation
    return {
      success: true,
      message: 'Logout successful',
    };
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  private async comparePassword(enteredPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(enteredPassword, hashedPassword);
  }
}
