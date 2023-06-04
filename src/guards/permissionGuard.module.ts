import { Module } from "@nestjs/common";
import { Guards } from "src/utils/constants";
import { PermissionGuard } from "./permission.guard";
import { RedisModule } from "src/common/services/redis/redis.module";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [
        RedisModule
    ],
    controllers: [],
    providers: [
        {
            provide: Guards.permission,
            useClass: PermissionGuard
        }
    ]
})
export class PermissionGuardModule { }
