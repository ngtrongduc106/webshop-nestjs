import { Module } from "@nestjs/common";
import { JwtCustomModule } from "src/common/services/jwt/jwt.module";
import { Guards } from "src/utils/constants";
import { AuthGuard } from "./auth.guard";

@Module({
    imports: [
        JwtCustomModule
    ],
    controllers: [],
    providers: [
        {
            provide: Guards.auth,
            useClass: AuthGuard
        }
    ]
})
export class AuthGuardModule { }