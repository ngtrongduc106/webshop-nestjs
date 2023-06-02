import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './database';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './app/auth/auth.module';
import { UserModule } from './app/user/user.module';

@Module({
  imports: [
    // Module
    AuthModule,
    UserModule,
    // Config Typeorm
    TypeOrmModule.forRoot(dataSourceOptions),
    // Config Env
    ConfigModule.forRoot({
      envFilePath: ".env"
    })
  ],
  controllers: [],
  providers: []
})
export class AppModule { }
