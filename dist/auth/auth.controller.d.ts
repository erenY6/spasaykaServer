import { Request } from 'express';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
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
    }>;
}
