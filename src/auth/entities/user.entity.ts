import { ApiProperty } from '@nestjs/swagger';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsBoolean, IsEmail, IsString } from 'class-validator';
import { Product } from '../../products/entities';

@Entity('users')
export class User {
  @ApiProperty({
    description: 'The unique identifier of the user',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'user@example.com',
  })
  @Column('text', { unique: true, nullable: false })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The hashed password of the user',
    writeOnly: true,
  })
  @Column('text', { nullable: false, select: false })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'The full name of the user',
    example: 'John Doe',
  })
  @Column('text', { nullable: false })
  @IsString()
  fullName: string;

  @ApiProperty({
    description: 'Whether the user account is active',
    default: true,
  })
  @Column('bool', { default: true })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({
    description: 'User roles',
    default: ['user'],
    isArray: true,
    example: ['user', 'admin'],
  })
  @Column('text', { array: true, default: ['user'] })
  roles: string[];

  @ApiProperty({
    description: 'Products created by the user',
    type: () => Product,
  })
  @OneToMany(() => Product, (product) => product.user, { eager: true })
  product: Product;

  @BeforeInsert()
  checkFieldBeforeInsert() {
    this.email = this.email.toLowerCase();
  }

  @BeforeUpdate()
  checkFieldBeforeUpdate() {
    this.checkFieldBeforeInsert();
  }
}