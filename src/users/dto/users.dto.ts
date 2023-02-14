import { ShippingAddress } from './../schema/shipping-address.schema';
import { Exclude, Expose } from 'class-transformer';
import { Length, IsEmail, IsNotEmpty } from 'class-validator';

@Exclude()
export class UserDto {
  @Expose()
  email: string;
  @IsNotEmpty()
  password: string;
  @Expose()
  name: string;
  @Expose()
  isAdmin: boolean;
  @Expose()
  isSeller: boolean;
  @Expose()
  shippingAddress: ShippingAddress;
  @Expose()
  createdAt: Date;
  @Expose()
  updatedAt: Date;
}
