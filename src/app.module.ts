import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './model/products/products.module';

@Module({
  imports: [
    // Third party module
    ConfigModule.forRoot({
      // cache:true,
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb+srv://tanviralamomi:eraromi1995@cluster0.yg3jlnc.mongodb.net'),
    ProductsModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
