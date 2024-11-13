import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsBoolean, IsEmail, IsString } from 'class-validator';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true, nullable: false })
  @IsEmail()
  email: string;

  @Column('text', { nullable: false })
  @IsString()
  password: string;

  @Column('text', { nullable: false })
  @IsString()
  fullName: string;

  @Column('bool', {
    default: true,
  })
  @IsBoolean()
  isActive: boolean;

  @Column('text', { array: true, default: ['user'] })
  roles: string[];
}