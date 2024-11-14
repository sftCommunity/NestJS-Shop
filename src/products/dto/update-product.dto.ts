import { ApiExtraModels, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';

@ApiExtraModels(CreateProductDto)
export class UpdateProductDto extends PartialType(CreateProductDto) {}