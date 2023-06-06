import { Module } from "@nestjs/common";
import { Services } from "src/utils/constants";
import { LocateService } from "./locate.service";

@Module({
    imports: [],
    providers: [
        {
            provide: Services.Locate,
            useClass: LocateService
        }
    ],
    exports: [
        {
            provide: Services.Locate,
            useClass: LocateService
        }
    ]
})
export class LocateModule { }