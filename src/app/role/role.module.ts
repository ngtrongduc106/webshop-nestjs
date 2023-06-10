import { Module } from "@nestjs/common";
import { RoleController } from "./role.controller";
import { Services } from "src/utils/constants";
import { RoleService } from "./role.service";
import { AuthenGuardModule } from "src/guards/authen/authenGuard.module";
import { AuthorGuardModule } from "src/guards/author/authorGuard.module";

@Module({
    imports: [
        AuthenGuardModule,
        AuthorGuardModule
    ],
    controllers: [
        RoleController
    ],
    providers: [
        {
            provide: Services.Role,
            useClass: RoleService
        }
    ]
})
export class RoleModule { }