export interface MvProduct{
    productId: number;
    name: string;
    description: string;
    stock: number;
    rate?: number;
    startDate?: Date;
    endDate?: Date;
}

