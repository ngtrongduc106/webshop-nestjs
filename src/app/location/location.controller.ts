import { Controller, Get, Inject, Param } from "@nestjs/common";
import { Controllers, Services } from "src/utils/constants";
import { ILocationService } from "./location";
import { GetCitiesDTO } from "./dtos/GetCities.dto";
import { GetDistrictsDTO } from "./dtos/GetDistricts.dto";

@Controller(Controllers.Location)
export class LocationController {
    constructor(
        @Inject(Services.Location) private readonly locationService: ILocationService
    ) { }

    @Get("cities/:country")
    getAllCities(@Param() param: GetCitiesDTO) {
        return this.locationService.handleGetAllCities(GetCitiesDTO.plainToClass(param));
    }

    @Get("districts/:country/:cityId")
    getDistricts(@Param() param: GetDistrictsDTO) {
        return this.locationService.handleGetDistricts(GetDistrictsDTO.plainToClass(param));
    }
}