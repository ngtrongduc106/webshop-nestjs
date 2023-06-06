import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import { Locate_City, Locate_District } from "src/utils/type";
import { ILocateService } from "./locate";

@Injectable()
export class LocateService implements ILocateService {

    private path(country: string): { pathCity: string, pathDistrict: string } {
        const pathCity = `/src/utils/data/locate/${country}/cities.json`;
        const pathDistrict = `/src/utils/data/locate/${country}/districts.json`;

        return { pathCity, pathDistrict };
    }

    getAllCities(country: string): Locate_City[] {
        const path = this.path(country);

        const read = fs.readFileSync(path.pathCity);

        const cities: Locate_City[] = JSON.parse(read.toString());

        return cities;
    }

    getAllDistricts(country: string): Locate_District[] {
        const path = this.path(country);

        const read = fs.readFileSync(path.pathDistrict);

        const districts: Locate_District[] = JSON.parse(read.toString());

        return districts;
    }

    getAllDistrictsByCityId(country: string, cityId: string): Locate_District[] {
        const path = this.path(country);

        const read = fs.readFileSync(path.pathCity);

        const districts: Locate_District[] = JSON.parse(read.toString());

        const result: Locate_District[] = districts.filter((district) => district.cityId === cityId);

        return result;
    }
}