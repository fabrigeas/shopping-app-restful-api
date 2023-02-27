import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateOfferDto {
  @IsString()
  public title: string;
  @IsString()
  public price: string;
  @IsString()
  public offerType: string;
  @IsString()
  public date: Date;
  @IsString()
  public description: string;
  @IsArray()
  public images: string[];
  @IsArray()
  public daysOfTheWeek: string[];
}
export class UpdateOfferDto extends CreateOfferDto {
  @IsOptional()
  @IsString()
  public id: string;
}
export class PatchOfferDto {
  @IsOptional()
  @IsString()
  public title: string;
  @IsOptional()
  @IsString()
  public price: string;
  @IsOptional()
  @IsString()
  public offerType: string;
  @IsOptional()
  @IsString()
  public date: Date;
  @IsOptional()
  @IsString()
  public description: string;
  @IsOptional()
  @IsArray()
  public images: string[];
  @IsOptional()
  @IsArray()
  public daysOfTheWeek: string[];
}
