import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './utils/exceptions/exception.filter';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DSOptions } from './database';
import { AuthModule } from './app/auth/auth.module';
import { LocationModule } from './app/location/location.module';
import { UserModule } from './app/user/user.module';
import { RoleModule } from './app/role/role.module';

@Module({
  imports: [
    AuthModule,
    LocationModule,
    UserModule,
    RoleModule,
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
