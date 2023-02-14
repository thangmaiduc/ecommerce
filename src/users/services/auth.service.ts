import { ShippingAddress } from './../schema/shipping-address.schema';
import { UsersService } from './users.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schema/users.schema';
import * as bcrypt from 'bcrypt';
import { AuthDto } from '../dto/auth.dto';
import { BadRequestException, HttpException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { HttpStatus } from '@nestjs/common/enums';
import { plainToInstance, plainToClass } from 'class-transformer';
import { UserDto } from '../dto/users.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async signup(dto: AuthDto): Promise<UserDocument> {
    const { email, password } = dto;
    const foundUser = await this.userModel.findOne({ email });
    if (foundUser) {
      throw new BadRequestException('Email already exists');
    }
    const shippingAddress: ShippingAddress = {
      address: 'address',
      city: 'city',
      fullName: 'full name',
      phone: 'phone',
      postalCode: 'postalCode',
      state: 'state',
    };
    dto.password = await this.hash(password);
    const createdUser = await this.userModel.create({
      ...dto,
      shippingAddress,
    });

    return createdUser;
  }

  async signin(dto: AuthDto) {
    const { email, password } = dto;
    const foundUser = await this.userModel.findOne({ email });
    if (!foundUser) {
      throw new BadRequestException('Authentication failed');
    }

    const isMatch = this.compare(password, foundUser.password);
    if (!isMatch) {
      throw new BadRequestException('Authentication failed');
    }

    const accessToken = await this._createToken({ email });
    delete foundUser.password;
    // const user = plainToClass(UserDto, foundUser, {});

    return {
      user: foundUser,
      accessToken,
    };
  }

  async validateUser(email) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  private async _createToken({ email }) {
    const accessToken = this.jwtService.sign({ email });
    return accessToken;
  }

  async hash(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }
  compare(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}
