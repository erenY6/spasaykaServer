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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimalAdController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const animal_ad_service_1 = require("./animal-ad.service");
let AnimalAdController = class AnimalAdController {
    animalAdService;
    constructor(animalAdService) {
        this.animalAdService = animalAdService;
    }
    async uploadFiles(files, body) {
        const { name, gender, age, info1, info2, address, description, fullDesc, authorId, tagIds } = body;
        const imageUrls = files.map(file => `/images/${file.filename}`);
        const tagIdArray = typeof body.tags === 'string' ? body.tags.split(',') : body.tags || [];
        return await this.animalAdService.createAd({
            name,
            gender,
            age,
            address,
            info1,
            info2,
            description,
            fullDesc,
            authorId,
            imageUrls,
            tagIds: tagIdArray
        });
    }
    async getAds() {
        return await this.animalAdService.getAds();
    }
    async getAdById(id) {
        return this.animalAdService.getAdById(id);
    }
    async getAdsByAuthor(authorId) {
        return await this.animalAdService.getAdsByAuthor(authorId);
    }
};
exports.AnimalAdController = AnimalAdController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images', 5, {
        storage: (0, multer_1.diskStorage)({
            destination: './images',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, uniqueSuffix + (0, path_1.extname)(file.originalname));
            }
        }),
    })),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", Promise)
], AnimalAdController.prototype, "uploadFiles", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AnimalAdController.prototype, "getAds", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AnimalAdController.prototype, "getAdById", null);
__decorate([
    (0, common_1.Get)('by-author/:authorId'),
    __param(0, (0, common_1.Param)('authorId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AnimalAdController.prototype, "getAdsByAuthor", null);
exports.AnimalAdController = AnimalAdController = __decorate([
    (0, common_1.Controller)('animal-ad'),
    __metadata("design:paramtypes", [animal_ad_service_1.AnimalAdService])
], AnimalAdController);
//# sourceMappingURL=animal-ad.controller.js.map