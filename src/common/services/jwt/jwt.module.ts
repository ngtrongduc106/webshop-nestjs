import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { Services } from "src/utils/constants";
import { JwtCustomService } from "./jwt.service";

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: process.env.JWTSecret,
            signOptions: {
                expiresIn: 60 * 60 * 24
            }
        })
    ],
    controllers: [],
    providers: [
        {
            provide: Services.Jwt,
            useClass: JwtCustomService
        }
    ],
    exports: [
        {
            provide: Services.Jwt,
            useClass: JwtCustomService
        }
    ],
})
export class JwtCustomModule { }