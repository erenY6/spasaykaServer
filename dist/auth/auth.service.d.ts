import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private jwtService;
    private prisma;
    constructor(jwtService: JwtService);
    register(email: string, password: string, name?: string): Promise<{
        id: string;
        email: string;
        name: string | null;
    }>;
    login(email: string, password: string): Promise<{
        token: string;
    }>;
}
