import { OrderItem } from './../schemas/order_item.schema';
import { Length, IsNotEmpty, Min } from 'class-validator';
import { ShippingAddress } from 'src/users/schema/shipping-address.schema';

export class CreateOrderDto {
  @IsNotEmpty()
  orderItems: Array<OrderItem>;

  @IsNotEmpty()
  paymentMethod: string;

  @Min(0)
  shippingPrice: number;
  shippingAddress: ShippingAddress | null;
}
