export declare class AnimalAdService {
    private prisma;
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
