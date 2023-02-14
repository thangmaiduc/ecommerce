import { Product } from './../../product/schemas/product.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
@Schema()
export class OrderItem {
  @Prop({
    required: true,
    min: 1,
  })
  qty: number;
  @Prop({
    required: true,
  })
  name: string;
  @Prop({
    required: true,
  })
  image: string;
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  })
  product: Product;
  @Prop({
    required: true,
  })
  price: number;
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);
