import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './utils/exceptions/exception.filter';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DSOptions } from './database';

@Module({
  imports: [
    // Config Typeorm
    TypeOrmModule.forRoot(DSOptions),
    // Config Env
    ConfigModule.forRoot({
      envFilePath: ".env"
    })
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },]
})
export class AppModule { }
