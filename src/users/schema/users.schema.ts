import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  ShippingAddress,
  ShippingAddressSchema,
} from './shipping-address.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    unique: true,
    required: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  password: string;
  minlength: 5;
  @Prop({
    default: false,
  })
  isAdmin: boolean;
  @Prop({
    default: false,
  })
  isSeller: boolean;
  @Prop({ type: ShippingAddressSchema })
  shippingAddress: ShippingAddress;
}

// interface ShippingAddress {
//   fullName: string;
//   address: string;
//   city: string;
//   postalCode: string;
//   state: string;
//   phone: string;
// }

export const UserSchema = SchemaFactory.createForClass(User);
