import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './database';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './app/auth/auth.module';
import { UserModule } from './app/user/user.module';
import { RoleModule } from './app/role/role.module';

@Module({
  imports: [
    // Module
    AuthModule,
    UserModule,
    RoleModule,
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
