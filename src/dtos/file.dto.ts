import { IsString } from 'class-validator';

export class DeleteFileDto {
  @IsString()
  public filename: string;
}
