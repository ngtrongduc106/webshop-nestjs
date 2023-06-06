import { Module } from "@nestjs/common";
import { Services } from "src/utils/constants";
import { BcryptService } from "./bcrypt.service";

@Module({
    providers: [
        {
            provide: Services.Bcrypt,
            useClass: BcryptService
        }
    ],
    exports: [
        {
            provide: Services.Bcrypt,
            useClass: BcryptService
        }
    ]
})
export class BcryptModule { }