import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'The product title',
    example: 'Nike Air Max',
    minLength: 1,
  })
  @IsString()
  @MinLength(1)
  title: string;

  @ApiPropertyOptional({
    description: 'The product price in the default currency',
    example: 99.99,
    minimum: 0,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @ApiPropertyOptional({
    description: 'Detailed description of the product',
    example: 'Premium running shoes with air cushioning',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'URL-friendly version of the title',
    example: 'nike-air-max',
  })
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiPropertyOptional({
    description: 'Available quantity in inventory',
    example: 100,
    minimum: 0,
  })
  @IsInt()
  @IsPositive()
  @IsOptional()
  stock?: number;

  @ApiProperty({
    description: 'Available sizes for the product',
    example: ['S', 'M', 'L', 'XL'],
    type: [String],
  })
  @IsString({ each: true })
  @IsArray()
  sizes: string[];

  @ApiProperty({
    description: 'Target gender category for the product',
    example: 'unisex',
    enum: ['men', 'women', 'kids', 'unisex'],
  })
  @IsIn(['men', 'women', 'kids', 'unisex'])
  gender: string;

  @ApiPropertyOptional({
    description: 'Product tags for categorization and search',
    example: ['sports', 'running', 'outdoor'],
    type: [String],
  })
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  tags: string[];

  @ApiPropertyOptional({
    description: 'Array of image URLs for the product',
    example: ['image1.jpg', 'image2.jpg'],
    type: [String],
  })
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images?: string[];
}
