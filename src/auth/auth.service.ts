import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create(createUserDto);
      await this.userRepository.save(user);
      return user;
    } catch (e) {
      this.handleDatabaseErrors(e);
    }
  }

  private handleDatabaseErrors(e: any): never {
    if (e.code === '23505') throw new BadRequestException(e.detail);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}