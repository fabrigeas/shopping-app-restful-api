export declare class CreateOfferDto {
    title: string;
    price: string;
    offerType: string;
    date: Date;
    description: string;
    images: string[];
    daysOfTheWeek: string[];
}
export declare class UpdateOfferDto extends CreateOfferDto {
    id: string;
}
export declare class PatchOfferDto {
    title: string;
    price: string;
    offerType: string;
    date: Date;
    description: string;
    images: string[];
    daysOfTheWeek: string[];
}
