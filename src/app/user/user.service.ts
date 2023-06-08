import { Inject, Injectable } from "@nestjs/common";
import { IUserService } from "./user";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/database/entities/User.entity";
import { Repository } from "typeorm";
import { Locate_City, Locate_District, User_GetProfile_Details, User_GetProfile_Result, User_GetProfile_UserAddress_Details } from "src/utils/type";
import { Services } from "src/utils/constants";
import { ILocateService } from "src/utils/modules/locate/locate";

@Injectable()
export class UserService implements IUserService {
    constructor(
        @InjectRepository(UserEntity) private readonly userEntity: Repository<UserEntity>,
        @Inject(Services.Locate) private readonly locateService: ILocateService
    ) { }

    async handleGetProfile(data: User_GetProfile_Details): Promise<User_GetProfile_Result> {
        const user = await this.userEntity.findOne({
            where: {
                userId: data.userId
            },
            relations: ['userAddress'],
            select: [
                "userId", "userEmail", "userFirstName", "userLastName", "userPhone", "userAddress"
            ]
        });

        const formatAddress: User_GetProfile_UserAddress_Details[] = [];

        user.userAddress.map((address) => {
            const cities: Locate_City[] = this.locateService.getAllCities(address.country);
            const districts: Locate_District[] = this.locateService.getAllDistrictsByCityId(address.country, address.cityId);
            const tmp: User_GetProfile_UserAddress_Details = {
                country: address.country,
                cityId: address.cityId,
                cityName: cities.find((x) => x.cityId == address.cityId).name,
                districtId: address.districtId,
                districtName: districts.find((x) => x.districtId === address.districtId).name,
                homeAddress: address.homeAddress
            }
            formatAddress.push(tmp);
        })


        const result: User_GetProfile_Result = {
            userId: user.userId,
            userEmail: user.userEmail,
            userFirstName: user.userFirstName,
            userLastName: user.userLastName,
            userPhone: user.userPhone,
            userAddress: formatAddress
        }

        return result;
    }
} 