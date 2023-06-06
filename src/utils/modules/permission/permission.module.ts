import { Module } from "@nestjs/common";
import { Services } from "src/utils/constants";
import { PermissionService } from "./permission.service";

@Module({
    imports: [],
    providers: [
        {
            provide: Services.Permission,
            useClass: PermissionService
        }
    ],
    exports: [
        {
            provide: Services.Permission,
            useClass: PermissionService
        }
    ]
})
export class PermissionModule { }