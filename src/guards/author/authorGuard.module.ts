import { Module } from "@nestjs/common";
import { Guards } from "src/utils/constants";
import { AuthorGuard } from "./author.guard";
import { RedisModule } from "src/utils/modules/redis/redis.module";

@Module({
    imports: [
        RedisModule
    ],
    providers: [
        {
            provide: Guards.Author,
            useClass: AuthorGuard
        }
    ],
    exports: [
        {
            provide: Guards.Author,
            useClass: AuthorGuard
        },
        RedisModule
    ]
})
export class AuthorGuardModule { }