import { BadRequestException } from '@nestjs/common/exceptions';
import { ProductService } from './../product/product.service';
import { ShippingAddress } from './../users/schema/shipping-address.schema';
import { plainToInstance, plainToClass } from 'class-transformer';
import { CreateOrderDto } from './dto/create-Order.dto';
import { Order, OrderDocument, Status } from './schemas/Order.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pagination } from 'src/common/pagination.interface';
import * as _ from 'lodash';
import { Req } from '@nestjs/common/decorators';
@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<OrderDocument>,
    private readonly productService: ProductService,
  ) {}
  //   async getById(id: string) {
  //     return await this.orderModel.find().populate('seller', '_id name').exec();
  //   }

  //   async get(pagination: Pagination) {
  //     let sort: any = { createdAt: -1 };
  //     const limit: number = pagination.limit || 5;
  //     const page: number = pagination.page || 0;
  //     const skip: number = page * limit;
  //     if (pagination.sort) {
  //       sort = {};
  //       sort[pagination.sort] = pagination.direction;
  //     }
  //     return await this.orderModel
  //       .find()
  //       .limit(pagination.limit || 5)
  //       .skip(skip)
  //       .sort(sort)
  //       .select('-reviews')
  //       .populate('seller', '_id name')

  //       .exec();
  //   }
  async updateStatusToDelivering(id: string) {
    const order = await this.orderModel.findById(id).exec();
    if (!order) throw new BadRequestException('Order not found');
    // if (
    //   _.include(
    //     [Status.CANCELLED, Status.DELIVERED, Status.DELIVERING],
    //     order.status,
    //   )
    // ) {
    //   throw new BadRequestException(
    //     'Order is already delivering or delivered or cancelled',
    //   );
    // }
    console.log(order.status);

    if (order.status !== Status.PENDING) {
      throw new BadRequestException('Status of order is not correct');
    }
    return await this.orderModel.findByIdAndUpdate(
      id,
      {
        $set: {
          status: Status.DELIVERING,
        },
      },
      { new: true },
    );
  }
  async updateStatusToDelivered(id: string) {
    const order = await this.orderModel.findById(id).exec();
    if (!order) throw new BadRequestException('Order not found');
    if (order.status !== Status.DELIVERING) {
      throw new BadRequestException('Status of order is not correct');
    }
    const updateOrder: any = {
      status: Status.DELIVERED,
      isDelivered: true,
      deliveredAt: new Date(),
    };
    if (order.isPaid === false) {
      updateOrder.isPaid = true;
      updateOrder.paidAt = new Date();
    }

    return await this.orderModel.findByIdAndUpdate(
      id,
      {
        $set: updateOrder,
      },
      { new: true },
    );
  }
  async updateStatusToCancelled(id: string) {
    const order = await this.orderModel.findById(id).exec();
    if (!order) throw new BadRequestException('Order not found');
    if ([Status.CANCELLED, Status.DELIVERED].includes(order.status)) {
      throw new BadRequestException('Order is already delivered or cancelled');
    }
    if (order.status === Status.DELIVERING) {
      throw new BadRequestException(
        'Order cannot be cancel because it is being delivered',
      );
    }
    return await this.orderModel.findByIdAndUpdate(
      id,
      {
        $set: {
          status: Status.CANCELLED,
        },
      },
      { new: true },
    );
  }
  async create(dto: CreateOrderDto, req) {
    let itemsPrice = 0;
    dto.orderItems.forEach((item) => {
      itemsPrice += item.price;
    });
    const totalPrice = dto.shippingPrice + itemsPrice;
    if (_.isEmpty(dto.shippingAddress)) {
      dto.shippingAddress = req.user.shippingAddress;
    }
    console.log(dto.shippingAddress);

    await Promise.all(
      dto.orderItems.map(async (item) =>
        this.productService.updateQuantity(item.product, -item.qty),
      ),
    );
    return this.orderModel.create({
      ...dto,
      totalPrice,
      itemsPrice,
      user: req.user._id,
    });
  }
}
