import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { ILocationService } from "./location";
import { Locate_City, Locate_District, Location_GetAllCities_Details, Location_GetDistrict_Details } from "src/utils/type";
import { Services } from "src/utils/constants";
import { ILocateService } from "src/utils/modules/locate/locate";

@Injectable()
export class LocationService implements ILocationService {
    constructor(
        @Inject(Services.Locate) private readonly locateService: ILocateService
    ) { }

    handleGetAllCities(data: Location_GetAllCities_Details): Locate_City[] {
        const cities: Locate_City[] = this.locateService.getAllCities(data.country);

        if (cities.length <= 0) {
            throw new HttpException("City not found", HttpStatus.NOT_FOUND);
        }

        return cities;
    }

    handleGetDistricts(data: Location_GetDistrict_Details): Locate_District[] {
        const districts: Locate_District[] = this.locateService.getAllDistrictsByCityId(data.country, data.cityId);

        if (districts.length <= 0) {
            throw new HttpException("City not found", HttpStatus.NOT_FOUND);
        }

        return districts;
    }

}