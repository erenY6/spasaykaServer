export declare class AnimalAdService {
    private prisma;
    createAd(data: {
        name: string;
        gender: string;
        age: string;
        info1?: string;
        info2?: string;
        address?: string;
        description?: string;
        fullDesc?: string;
        imageUrls: string[];
        tagIds: string[];
        authorId: string;
    }): Promise<{
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
            avatar: string | null;
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
            avatar: string | null;
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
            avatar: string | null;
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
            avatar: string | null;
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
