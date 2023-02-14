import { Length, IsNotEmpty, Min } from 'class-validator';
import mongoose from 'mongoose';

export class CreateProductDto {
  seller: mongoose.Schema.Types.ObjectId;
  @IsNotEmpty()
  brand: string;

  @Length(3, 30)
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  category: string;
  @Min(0)
  price: number;
  @Min(0)
  countInStock: number;
}
