import { OfferType } from '../interfaces/offer.interface';
import { CreateOfferDto } from '../dtos/offers.dto';
interface FakeOfferProps {
    title?: string;
    date?: Date;
    offerType?: OfferType;
    daysOfTheWeek?: string[];
}
export declare const fakeOffer: (props?: FakeOfferProps) => CreateOfferDto;
export declare const fakeOfferList: (count: number, props?: FakeOfferProps) => CreateOfferDto[];
export {};
