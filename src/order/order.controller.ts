import { CreateOrderDto } from './dto/create-order.dto';
import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Get,
  Req,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Status } from './schemas/Order.schema';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Post()
  create(@Body() dto: CreateOrderDto, @Req() req) {
    return this.orderService.create(dto, req);
  }
  @Put(':id')
  updateStatus(@Param('id') id: string, @Query('status') status: Status) {
    switch (status) {
      case Status.DELIVERING:
        return this.orderService.updateStatusToDelivering(id);
      case Status.DELIVERED:
        return this.orderService.updateStatusToDelivered(id);
      case Status.CANCELLED:
        return this.orderService.updateStatusToCancelled(id);
    }
  }
  // @Get(':id')
  // getById(@Param('id') id: string) {
  //   return this.orderService.getById(id);
  // }
  // @Get()
  // get() {
  //   return this.orderService.get();
  // }
}
