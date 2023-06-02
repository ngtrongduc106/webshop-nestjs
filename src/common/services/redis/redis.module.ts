import { Module } from "@nestjs/common";
import { Services } from "src/utils/constants";
import { RedisService } from "./redis.service";

@Module({
    imports: [],
    controllers: [],
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
export class RedisModule {

}