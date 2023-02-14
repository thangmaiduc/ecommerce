import { BadRequestException } from '@nestjs/common/exceptions';
import { plainToInstance, plainToClass } from 'class-transformer';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductDto } from './dto/product.dto';
import { Product, ProductDocument } from './schemas/product.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from './schemas/review.schema';
import { Pagination } from 'src/common/pagination.interface';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}
  async getById(id: string) {
    return await this.productModel.find().populate('seller', '_id name').exec();
  }

  async get(pagination: Pagination) {
    let sort: any = { createdAt: -1 };
    const limit: number = pagination.limit || 5;
    const page: number = pagination.page || 0;
    const skip: number = page * limit;
    if (pagination.sort) {
      sort = {};
      sort[pagination.sort] = pagination.direction;
    }
    return await this.productModel
      .find()
      .limit(pagination.limit || 5)
      .skip(skip)
      .sort(sort)
      .select('-reviews')
      .populate('seller', '_id name')

      .exec();
  }
  async updateById(id: string, dto: Partial<CreateProductDto>) {
    const product = await this.productModel.findById(id);
    for (const key in dto) {
      if (dto[key]) product[key] = dto[key];
    }
    await product.save();

    return plainToClass(ProductDto, product);
  }
  async create(dto: CreateProductDto) {
    return this.productModel.create({
      ...dto,
    });
  }
  async updateQuantity(id, qty: number) {
    const product = await this.productModel.findById(id);
    if (product.countInStock - Math.abs(qty) <= 0)
      throw new BadRequestException('Count in stock is not enough');
    return this.productModel.findByIdAndUpdate(id, {
      $inc: {
        countInStock: qty,
      },
    });
  }
}
