import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @ApiOperation({
    summary: 'Execute database seed',
    description: 'Populates the database with initial data',
  })
  @ApiResponse({
    status: 200,
    description: 'Seed executed successfully',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error during seeding',
  })
  @Get()
  executeSeed() {
    return this.seedService.runSeed();
  }
}
