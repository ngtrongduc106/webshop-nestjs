import { Module } from "@nestjs/common";
import { RoleController } from "./role.controller";
import { Services, Values } from "src/utils/constants";
import { RolesService } from "./role.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RolesEntity } from "src/database/entities/Roles.entity";
import { permissions } from "src/common/data/permission";
import { RoleHasPermissionEntity } from "src/database/entities/RoleHasPermission.entity";
import { UsersEntity } from "src/database/entities/Users.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([RolesEntity, RoleHasPermissionEntity, UsersEntity])
    ],
    controllers: [RoleController],
    providers: [
        {
            provide: Services.Role,
            useClass: RolesService
        },
        {
            provide: Values.Permission,
            useValue: permissions
        }
    ],
})
export class RoleModule {

}