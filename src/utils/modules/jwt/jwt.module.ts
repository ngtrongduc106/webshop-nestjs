import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { Services } from "src/utils/constants";
import { JwtCustomService } from "./jwt.service";

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>("JwtSecret"),
                signOptions: {
                    expiresIn: 60 * 60 * 24
                }
            })
        })
    ],
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
    ]
})
export class JwtCustomModule { }