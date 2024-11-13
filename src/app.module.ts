import { join } from 'path';

import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import { FilesModule } from './files/files.module';
import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { SeedModule } from './seed/seed.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST_DB,
      port: +process.env.PORT_DB,
      database: process.env.NAME_DB,
      username: process.env.USERNAME_DB,
      password: process.env.PASSWORD_DB,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ProductsModule,
    CommonModule,
    SeedModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}