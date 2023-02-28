import { CreateOfferDto } from '@dtos/offers.dto';
import { HttpException } from '@exceptions/HttpException';
import { Offer } from '@interfaces/offer.interface';
import offerModel from '@models/offers.model';
import { isEmpty } from '@utils/util';
import { STATUS_CODES } from '@utils/constants';

type Query = Record<string, any>;

class OfferService {
  public offers = offerModel;

  public async findAllOffer(quer: Query): Promise<Offer[]> {
    const { title, offerType, daysOfTheWeek } = quer;
    const query: Query = {};

    if (title) {
      query.title = { $regex: title, $options: 'i' };
    }

    if (daysOfTheWeek) {
      query.daysOfTheWeek = { $regex: daysOfTheWeek, $options: 'i' };
    }

    if (offerType) {
      query.offerType = { $regex: offerType, $options: 'i' };
    }

    const offers: Offer[] = await this.offers.find(query);
    return offers;
  }

  public async findOfferById(offerId: string): Promise<Offer> {
    if (isEmpty(offerId))
      throw new HttpException(STATUS_CODES.BAD_REQUEST, 'OfferId is empty');

    const findOffer: Offer = await this.offers.findOne({ _id: offerId });
    if (!findOffer) throw new HttpException(STATUS_CODES.CONFLICT, "Offer doesn't exist");

    return findOffer;
  }

  public async createOffer(offerData: CreateOfferDto): Promise<Offer> {
    if (isEmpty(offerData))
      throw new HttpException(STATUS_CODES.BAD_REQUEST, 'offerData is empty');

    const findOffer: Offer = await this.offers.findOne({ title: offerData.title });
    if (findOffer)
      throw new HttpException(
        STATUS_CODES.CONFLICT,
        `This title ${offerData.title} already exists`,
      );

    const createOfferData: Offer = await this.offers.create(offerData);

    return createOfferData;
  }

  public async updateOffer(offerId: string, offerData: CreateOfferDto): Promise<Offer> {
    if (isEmpty(offerData))
      throw new HttpException(STATUS_CODES.BAD_REQUEST, 'offerData is empty');

    const { title } = offerData;

    if (title) {
      const findOffer: Offer = await this.offers.findOne({ title });
      if (findOffer && findOffer._id != offerId)
        throw new HttpException(
          STATUS_CODES.CONFLICT,
          `This title ${offerData.title} already exists`,
        );
    }

    return await this.patchOffer(offerId, offerData);
  }

  public async patchOffer(_id: string, offerData: CreateOfferDto) {
    if (isEmpty(offerData))
      throw new HttpException(STATUS_CODES.BAD_REQUEST, 'offerData is empty');

    await this.offers.updateOne({ _id }, offerData);
    const patchedOffer = await this.offers.findById(_id);

    return patchedOffer;
  }

  public async deleteOffer(offerId: string): Promise<Offer> {
    const deleteOfferById: Offer = await this.offers.findByIdAndDelete(offerId);
    if (!deleteOfferById)
      throw new HttpException(STATUS_CODES.CONFLICT, "Offer doesn't exist");

    return deleteOfferById;
  }
}

export default OfferService;
