import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { appDbConfig } from './config/app.dbconfig';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ProductsModule, UsersModule, TypeOrmModule.forRoot(appDbConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
