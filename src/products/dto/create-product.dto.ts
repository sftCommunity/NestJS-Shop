import {
  IsArray,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(1)
  title: string;
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;
  @IsString()
  description?: string;
  @IsPositive()
  @IsString()
  @IsPositive()
  slug?: string;
  @IsInt()
  @IsPositive()
  @IsPositive()
  stock?: number;
  @IsString({ each: true })
  @IsArray()
  sizes: string[];
  @IsIn(['men', 'women', 'kids', 'unisex'])
  gender: string;
}