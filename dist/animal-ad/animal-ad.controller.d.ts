import { AnimalAdService } from './animal-ad.service';
export declare class AnimalAdController {
    private readonly animalAdService;
    constructor(animalAdService: AnimalAdService);
    uploadFiles(files: Express.Multer.File[], body: any): Promise<{
        images: {
            id: string;
            url: string;
            adId: string;
        }[];
        tags: {
            id: string;
            label: string;
        }[];
        author: {
            id: string;
            name: string;
            email: string | null;
            phone: string | null;
            surname: string | null;
            password: string;
        } | null;
    } & {
        id: string;
        name: string;
        gender: string;
        age: string;
        address: string | null;
        info1: string | null;
        info2: string | null;
        description: string | null;
        fullDesc: string | null;
        createdAt: Date;
        authorId: string | null;
    }>;
    getAds(): Promise<({
        images: {
            id: string;
            url: string;
            adId: string;
        }[];
        tags: {
            id: string;
            label: string;
        }[];
        author: {
            id: string;
            name: string;
            email: string | null;
            phone: string | null;
            surname: string | null;
            password: string;
        } | null;
    } & {
        id: string;
        name: string;
        gender: string;
        age: string;
        address: string | null;
        info1: string | null;
        info2: string | null;
        description: string | null;
        fullDesc: string | null;
        createdAt: Date;
        authorId: string | null;
    })[]>;
    getAdById(id: string): Promise<({
        images: {
            id: string;
            url: string;
            adId: string;
        }[];
        tags: {
            id: string;
            label: string;
        }[];
        author: {
            id: string;
            name: string;
            email: string | null;
            phone: string | null;
            surname: string | null;
            password: string;
        } | null;
    } & {
        id: string;
        name: string;
        gender: string;
        age: string;
        address: string | null;
        info1: string | null;
        info2: string | null;
        description: string | null;
        fullDesc: string | null;
        createdAt: Date;
        authorId: string | null;
    }) | null>;
    getAdsByAuthor(authorId: string): Promise<({
        images: {
            id: string;
            url: string;
            adId: string;
        }[];
        tags: {
            id: string;
            label: string;
        }[];
        author: {
            id: string;
            name: string;
            email: string | null;
            phone: string | null;
            surname: string | null;
            password: string;
        } | null;
    } & {
        id: string;
        name: string;
        gender: string;
        age: string;
        address: string | null;
        info1: string | null;
        info2: string | null;
        description: string | null;
        fullDesc: string | null;
        createdAt: Date;
        authorId: string | null;
    })[]>;
}
