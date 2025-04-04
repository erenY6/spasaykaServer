import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
export declare class AuthController {
    private authService;
    private jwtService;
    constructor(authService: AuthService, jwtService: JwtService);
    register(body: {
        name: string;
        surname: string;
        email?: string;
        phone?: string;
        password: string;
    }): Promise<{
        id: string;
        email: string | null;
        phone: string | null;
        name: string;
    }>;
    login(body: {
        emailOrPhone: string;
        password: string;
    }): Promise<{
        token: string;
    }>;
    getMe(req: Request): Promise<{
        id: string;
        name: string;
        email: string | null;
        phone: string | null;
        surname: string | null;
        avatar: string | null;
    }>;
    updateUser(req: Request, avatarFile: Express.Multer.File, body: {
        name: string;
        surname: string;
        email?: string;
        phone?: string;
    }): Promise<{
        id: string;
        name: string;
        email: string | null;
        phone: string | null;
        surname: string | null;
        password: string;
        avatar: string | null;
    }>;
}
