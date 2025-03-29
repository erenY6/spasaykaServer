import {
  Controller, Post, Body, Get, Req, UnauthorizedException,
  UseInterceptors, UploadedFile, Put
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { v4 as uuidv4 } from 'uuid'
import { extname } from 'path'
import { AuthService } from './auth.service'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
  
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
            avatar: true,
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

  @Put('update')
  @UseInterceptors(FileInterceptor('avatar', {
    storage: diskStorage({
      destination: './images',
      filename: (req, file, cb) => {
        const uniqueName = `${uuidv4()}${extname(file.originalname)}`
        cb(null, uniqueName)
      },
    }),
  }))
  async updateUser(
    @Req() req: Request,
    @UploadedFile() avatarFile: Express.Multer.File,
    @Body() body: { name: string; surname: string; email?: string; phone?: string }
  ) {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) throw new UnauthorizedException('Нет токена')
      const payload = this.jwtService.verify(token)

    const avatar = avatarFile?.filename

    return this.authService.updateUser(payload.sub, {
      ...body,
      avatar,
    })
  }
}
  