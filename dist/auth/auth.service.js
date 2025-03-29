"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    jwtService;
    prisma = new client_1.PrismaClient();
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async register(name, surname, password, email, phone) {
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
    async login(emailOrPhone, password) {
        const user = await this.prisma.user.findFirst({
            where: {
                OR: [
                    { email: emailOrPhone },
                    { phone: emailOrPhone },
                ],
            },
        });
        console.log('Found user:', user);
        if (!user)
            throw new common_1.UnauthorizedException('Пользователь не найден');
        const match = await bcrypt.compare(password, user.password);
        if (!match)
            throw new common_1.UnauthorizedException('Неверный пароль');
        const payload = { sub: user.id, email: user.email };
        const token = this.jwtService.sign(payload);
        return { token };
    }
    async updateUser(id, data) {
        return this.prisma.user.update({
            where: { id },
            data: {
                name: data.name,
                surname: data.surname,
                email: data.email,
                phone: data.phone,
                ...(data.avatar ? { avatar: data.avatar } : {}),
            },
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map