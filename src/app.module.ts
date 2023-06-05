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
  providers: []
})
export class AppModule { }
