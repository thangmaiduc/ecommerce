import { Length, IsEmail, IsNotEmpty } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @Length(5, 20, {
    message: 'Must be 5 to 20 characters',
  })
  @IsNotEmpty()
  password: string;

  @Length(5, 20, {
    message: 'Must be 5 to 20 characters',
  })
  @IsNotEmpty()
  name: string;
}
