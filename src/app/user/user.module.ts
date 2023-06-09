import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { Services } from "src/utils/constants";
import { UserService } from "./user.service";
import { AuthenGuard } from "src/guards/authen/authen.guard";
import { AuthenGuardModule } from "src/guards/authen/authenGuard.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/database/entities/User.entity";
import { UserAddressEntity } from "src/database/entities/UserAddress.entity";
import { LocateModule } from "src/utils/modules/locate/locate.module";
import { AuthorGuardModule } from "src/guards/author/authorGuard.module";

@Module({
    imports: [
        AuthenGuardModule,
        AuthorGuardModule,
        TypeOrmModule.forFeature([UserEntity, UserAddressEntity]),
        LocateModule
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