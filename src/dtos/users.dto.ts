import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UserSignInDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}
export class CreateUserDto extends UserSignInDto {
  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;
}

export class UpdateUserDto {
  @IsOptional() @IsString() public firstName: string;
  @IsOptional() @IsString() public lastName: string;
  @IsOptional() @IsString() public email: string;
}
