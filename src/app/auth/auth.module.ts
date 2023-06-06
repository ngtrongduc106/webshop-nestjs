import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { Services } from "src/utils/constants";
import { AuthService } from "./auth.service";

@Module({
    imports: [],
    controllers: [AuthController],
    providers: [
        {
            provide: Services.Auth,
            useClass: AuthService
        }
    ]
})
export class AuthModule { }