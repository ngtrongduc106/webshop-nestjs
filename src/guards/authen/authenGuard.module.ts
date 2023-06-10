import { Module } from "@nestjs/common";
import { Guards } from "src/utils/constants";
import { JwtCustomModule } from "src/utils/modules/jwt/jwt.module";
import { AuthenGuard } from "./authen.guard";

@Module({
    imports: [JwtCustomModule],
    providers: [
        {
            provide: Guards.Authen,
            useClass: AuthenGuard
        }
    ],
    exports: [
        {
            provide: Guards.Authen,
            useClass: AuthenGuard
        },
        JwtCustomModule
    ]
})
export class AuthenGuardModule { }