import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({
  _id: false,
})
export class ShippingAddress {
  @Prop({
    required: true,
  })
  fullName: string;

  @Prop({
    required: true,
  })
  address: string;

  @Prop({
    required: true,
  })
  city: string;

  @Prop({
    required: true,
  })
  postalCode: string;

  @Prop({
    required: true,
  })
  state: string;

  @Prop({
    required: true,
  })
  phone: string;
}

export const ShippingAddressSchema =
  SchemaFactory.createForClass(ShippingAddress);
