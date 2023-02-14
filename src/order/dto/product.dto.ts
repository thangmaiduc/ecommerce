import { Exclude, Expose } from 'class-transformer';
import { Length, IsEmail, IsNotEmpty } from 'class-validator';

@Exclude()
export class OrderDto {}
