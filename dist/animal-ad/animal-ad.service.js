"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimalAdService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let AnimalAdService = class AnimalAdService {
    prisma = new client_1.PrismaClient();
    async createAd(data) {
        return await this.prisma.animalAd.create({
            data: {
                name: data.name,
                gender: data.gender,
                age: data.age,
                info1: data.info1,
                info2: data.info2,
                address: data.address,
                description: data.description,
                fullDesc: data.fullDesc,
                author: { connect: { id: data.authorId } },
                tags: {
                    connect: (data.tagIds || []).map(id => ({ id }))
                },
                images: {
                    create: (data.imageUrls || []).map(url => ({ url }))
                }
            },
            include: {
                tags: true,
                images: true,
                author: true
            }
        });
    }
    async getAds() {
        return await this.prisma.animalAd.findMany({
            include: {
                images: true,
                tags: true,
                author: true
            }
        });
    }
    async getAdById(id) {
        return await this.prisma.animalAd.findUnique({
            where: { id },
            include: {
                images: true,
                tags: true,
                author: true
            }
        });
    }
    async getAdsByAuthor(authorId) {
        return await this.prisma.animalAd.findMany({
            where: { authorId },
            include: {
                images: true,
                tags: true,
                author: true
            }
        });
    }
};
exports.AnimalAdService = AnimalAdService;
exports.AnimalAdService = AnimalAdService = __decorate([
    (0, common_1.Injectable)()
], AnimalAdService);
//# sourceMappingURL=animal-ad.service.js.map