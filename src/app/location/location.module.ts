import { Module } from "@nestjs/common";
import { LocationController } from "./location.controller";
import { Services } from "src/utils/constants";
import { LocationService } from "./location.service";
import { LocateModule } from "src/utils/modules/locate/locate.module";

@Module({
    imports: [LocateModule],
    controllers: [LocationController],
    providers: [
        {
            provide: Services.Location,
            useClass: LocationService
        }
    ]
})
export class LocationModule { }