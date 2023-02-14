import { OrderItem } from './order_item.schema';
import {
  ShippingAddress,
  ShippingAddressSchema,
} from './../../users/schema/shipping-address.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User, UserSchema } from 'src/users/schema/users.schema';

export enum Status {
  PENDING = 'PENDING',
  // CONFIRMED,
  CANCELLED = 'CANCELLED',
  DELIVERING = 'DELIVERING',
  DELIVERED = 'DELIVERED',
}
export type OrderDocument = HydratedDocument<Order>;

@Schema({
  timestamps: true,
})
export class Order {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  user: User;

  @Prop()
  orderItems: OrderItem[];
  @Prop({
    required: true,
  })
  paymentMethod: string;
  @Prop({
    required: true,
    default: Status.PENDING,
    enum: Status,
  })
  status: Status;
  @Prop({
    required: true,
  })
  itemsPrice: number;

  @Prop({
    required: true,
  })
  shippingPrice: number;

  @Prop({
    required: true,
  })
  totalPrice: number;

  @Prop({
    default: false,
  })
  isPaid: boolean;

  @Prop({
    default: null,
  })
  paidAt: Date;

  @Prop({
    default: false,
  })
  isDelivered: boolean;

  @Prop({
    default: null,
  })
  deliveredAt: Date;
  @Prop({ type: ShippingAddressSchema })
  shippingAddress: ShippingAddress;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
