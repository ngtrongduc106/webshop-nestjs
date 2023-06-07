import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { Services } from "src/utils/constants";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/database/entities/User.entity";
import { BcryptModule } from "src/utils/modules/bcrypt/bcrypt.module";
import { JwtCustomModule } from "src/utils/modules/jwt/jwt.module";
import { RedisModule } from "src/utils/modules/redis/redis.module";
import { UserAddressEntity } from "src/database/entities/UserAddress.entity";
import { PermissionModule } from "src/utils/modules/permission/permission.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, UserAddressEntity]),
        BcryptModule,
        JwtCustomModule,
        RedisModule,
        PermissionModule
    ],
    controllers: [AuthController],
    providers: [
        {
            provide: Services.Auth,
            useClass: AuthService
        }
    ]
})
export class AuthModule { }