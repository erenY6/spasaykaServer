import {
    Controller,
    Post,
    Body,
    Get,
    Req,
    UnauthorizedException,
  } from '@nestjs/common'
  import { Request } from 'express'
  import { AuthService } from './auth.service'
  import { JwtService } from '@nestjs/jwt'
  
  @Controller('auth')
  export class AuthController {
    constructor(
      private authService: AuthService,
      private jwtService: JwtService
    ) {}
  
    @Post('register')
    async register(
      @Body()
      body: {
        name: string;
        surname: string;
        email?: string;
        phone?: string;
        password: string;
      },
    ) {
      return await this.authService.register(
        body.name,
        body.surname,
        body.password,
        body.email,
        body.phone,
      );
    }
  
  
    @Post('login')
    async login(
      @Body() body: { emailOrPhone: string; password: string },
    ) {
      return await this.authService.login(body.emailOrPhone, body.password);
    }
  
    @Get('me')
    async getMe(@Req() req: Request) {
      const authHeader = req.headers.authorization;
    
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException('Нет токена');
      }
    
      const token = authHeader.split(' ')[1];
    
      try {
        const payload = this.jwtService.verify(token);
    
        const user = await this.authService['prisma'].user.findUnique({
          where: { id: payload.sub },
          select: {
            id: true,
            name: true,
            surname: true,
            email: true,
            phone: true,
          },
        });
    
        if (!user) {
          throw new UnauthorizedException('Пользователь не найден');
        }
    
        return user;
      } catch (e) {
        throw new UnauthorizedException('Неверный токен');
      }
    }
  }
  