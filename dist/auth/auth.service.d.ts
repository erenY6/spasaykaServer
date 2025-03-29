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
    updateUser(id: string, data: {
        name: string;
        surname: string;
        email?: string;
        phone?: string;
        avatar?: string;
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
