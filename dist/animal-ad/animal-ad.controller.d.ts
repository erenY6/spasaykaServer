import { AnimalAdService } from './animal-ad.service';
export declare class AnimalAdController {
    private readonly animalAdService;
    constructor(animalAdService: AnimalAdService);
    uploadFile(file: Express.Multer.File, body: any): Promise<{
        id: string;
        name: string;
        gender: string;
        age: string;
        info1: string | null;
        info2: string | null;
        description: string | null;
        image: string;
        createdAt: Date;
    }>;
    getAds(): Promise<{
        id: string;
        name: string;
        gender: string;
        age: string;
        info1: string | null;
        info2: string | null;
        description: string | null;
        image: string;
        createdAt: Date;
    }[]>;
}
