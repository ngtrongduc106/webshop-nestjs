import { Module } from "@nestjs/common";
import { Services } from "src/utils/constants";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersEntity } from "src/database/entities/Users.entity";
import { UserController } from "./user.controller";
import { AuthGuardModule } from "src/guards/authGuard.module";
import { JwtCustomModule } from "src/common/services/jwt/jwt.module";
import { PermissionGuardModule } from "src/guards/permissionGuard.module";
import { RedisModule } from "src/common/services/redis/redis.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([UsersEntity]),
        JwtCustomModule,
        AuthGuardModule,
        PermissionGuardModule,
        RedisModule
    ],
    controllers: [UserController],
    providers: [
        {
            provide: Services.User,
            useClass: UserService
        }
    ]
})
export class UserModule { }