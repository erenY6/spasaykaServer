export declare class AnimalAdService {
    private prisma;
    createAd(data: any): Promise<{
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
