import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/users/schema/users.schema';
@Schema()
export class Review {
  @Prop({
    required: true,
  })
  text: string;
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  reviewer: User;
  @Prop({
    required: true,
    min: 0,
    max: 5,
  })
  rating: number;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
