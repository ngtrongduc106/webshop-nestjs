import { Locate_City, Locate_District, Location_GetAllCities_Details, Location_GetDistrict_Details } from "src/utils/type";

export interface ILocationService {
    handleGetAllCities(data: Location_GetAllCities_Details): Locate_City[]

    handleGetDistricts(data: Location_GetDistrict_Details): Locate_District[]
}