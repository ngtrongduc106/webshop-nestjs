import { Locate_City, Locate_District } from "src/utils/type"

export interface ILocateService {
    getAllCities(country: string): Locate_City[]

    getAllDistricts(country: string): Locate_District[]

    getAllDistrictsByCityId(country: string, cityId: string): Locate_District[]
}