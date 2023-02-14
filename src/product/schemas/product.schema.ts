import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User, UserSchema } from 'src/users/schema/users.schema';
import { Review, ReviewSchema } from './review.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema({
  timestamps: true,
})
export class Product {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  seller: User;

  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  category: string;
  @Prop({
    required: true,
  })
  brand: string;
  @Prop({
    required: true,
  })
  description: string;
  @Prop({
    required: true,
    default: 0,
    min: 0,
    max: 5,
  })
  rating: number;
  @Prop({
    required: true,
    default: 0,
    min: 0,
  })
  numberReviews: number;
  @Prop({
    required: true,
    default: 0,
    min: 0,
  })
  price: number;
  @Prop({
    required: true,
    default: 0,
    min: 0,
  })
  countInStock: number;

  // @Prop({
  //   type: Array<ReviewSchema>,
  //   // default: [],
  // })
  @Prop({
    required: true,
    default: [],
  })
  reviews: Array<Review>;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
