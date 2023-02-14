import { Review } from './../schemas/review.schema';
import { Exclude, Expose } from 'class-transformer';
import { Length, IsEmail, IsNotEmpty } from 'class-validator';

@Exclude()
export class ProductDto {
  @Expose()
  seller: string;
  @Expose()
  _id: string;
  @Expose()
  brand: string;
  @Expose()
  name: string;
  @Expose()
  category: string;
  @Expose()
  price: number;
  @Expose()
  countInStock: number;

  @Expose()
  reviews: [Review];
  @Expose()
  rating: number;
  @Expose()
  numberReviews: number;
  @Expose()
  createdAt: Date;
  @Expose()
  updatedAt: Date;
}
