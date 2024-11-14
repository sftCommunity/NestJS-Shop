import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'product_images' })
export class ProductImage {
  @ApiProperty({
    description: 'The unique identifier of the product image',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'The URL of the product image',
    example: 'https://example.com/images/product1.jpg',
  })
  @Column('text')
  url: string;

  @ApiProperty({
    description: 'The product this image belongs to',
    type: () => Product,
  })
  @ManyToOne(() => Product, (product) => product.images, {
    onDelete: 'CASCADE',
  })
  product: Product;
}
