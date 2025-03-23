import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private jwtService;
    private prisma;
    constructor(jwtService: JwtService);
    register(name: string, surname: string, password: string, email?: string, phone?: string): Promise<{
        id: string;
        email: string | null;
        phone: string | null;
        name: string;
    }>;
    login(emailOrPhone: string, password: string): Promise<{
        token: string;
    }>;
}
