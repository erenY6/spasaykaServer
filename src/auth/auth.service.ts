import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private prisma = new PrismaClient();

  constructor(private jwtService: JwtService) {}

  async register(
    name: string,
    surname: string,
    password: string,
    email?: string,
    phone?: string,
  ) {
    const hashed = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        name,
        surname,
        password: hashed,
        email,
        phone,
      },
    });

    return { id: user.id, email: user.email, phone: user.phone, name: user.name };
  }

  async login(emailOrPhone: string, password: string) {
  
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: emailOrPhone },
          { phone: emailOrPhone },
        ],
      },
    });
    console.log('Found user:', user);
    if (!user) throw new UnauthorizedException('Пользователь не найден');
  
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('Неверный пароль');
  
    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);
  
    return { token };
  }
}

