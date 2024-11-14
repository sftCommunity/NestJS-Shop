import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, LoginUserDto } from './dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });
      await this.userRepository.save(user);
      delete user.password;

      return user;
    } catch (e) {
      this.handleDatabaseErrors(e);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true },
    });

    if (!user) throw new UnauthorizedException('Incorrect email');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Incorrect password');

    return user;
  }

  private handleDatabaseErrors(e: any): never {
    if (e.code === '23505') throw new BadRequestException(e.detail);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}