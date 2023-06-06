import { Module } from "@nestjs/common";
import { Services } from "src/utils/constants";
import { RedisService } from "./redis.service";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [
        ConfigModule
    ],
    providers: [
        {
            provide: Services.Redis,
            useClass: RedisService
        }
    ],
    exports: [
        {
            provide: Services.Redis,
            useClass: RedisService
        }
    ]
})
export class RedisModule { }