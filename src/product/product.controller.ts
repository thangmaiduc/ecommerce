import { CreateProductDto } from './dto/create-product.dto';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Req,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Request } from 'express';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.productService.getById(id);
  }
  @Get('')
  get(
    @Query('limit') limit = 15,
    @Query('page') page = 0,
    @Query('sort') sort = 'createdAt',
    @Query('direction') direction: 1 | -1,
  ) {
    // return {
    //   limit,
    //   page,
    //   sort,
    //   direction,
    // };
    return this.productService.get({
      limit,
      page,
      sort,
      direction,
    });
  }
  @Put(':id')
  updateById(@Param('id') id: string, @Body() dto: Partial<CreateProductDto>) {
    return this.productService.updateById(id, dto);
  }
  @Post()
  create(@Body() dto: CreateProductDto, @Req() req: Request) {
    dto.seller = req.user['_id'];
    console.log(dto);
    return this.productService.create(dto);
  }
}
