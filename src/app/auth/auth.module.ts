import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { Services, Values } from "src/utils/constants";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersEntity } from "src/database/entities/Users.entity";
import { RolesEntity } from "src/database/entities/Roles.entity";
import { permissions } from "src/common/data/permission";
import { UserAddressEntity } from "src/database/entities/UserAddress.entity";
import { RedisModule } from "src/common/services/redis/redis.module";
import { BcryptModule } from "src/common/services/bcrypt/bcrypt.module";
import { JwtCustomModule } from "src/common/services/jwt/jwt.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([UsersEntity, RolesEntity, UserAddressEntity]),
        RedisModule,
        BcryptModule,
        JwtCustomModule
    ],
    controllers: [
        AuthController
    ],
    providers: [
        {
            provide: Services.Auth,
            useClass: AuthService
        },
        {
            provide: Values.Permission,
            useValue: permissions
        }
    ]
})
export class AuthModule { }