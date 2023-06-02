import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersEntity } from "src/database/entities/Users.entity";
import { Repository } from "typeorm";
import { TokenDTO } from "./dtos/Token.dto";
import { City, District, UserAddress, UserProfileResult } from "src/utils/type";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UsersEntity) private userEntity: Repository<UsersEntity>
    ) { }

    async handleProfile(data: TokenDTO) {
        const user = await this.userEntity.findOne({
            where: {
                userId: data.user.userId,
                isActive: true
            },
            relations: ['userAddress'],
            select: ['userId', 'userEmail', 'userFirstName', 'userLastName', 'userPhone', 'userAddress']
        })

        if (!user) {
            throw new HttpException("User not found", HttpStatus.NOT_FOUND)
        }

        user.userAddress.map((x) => {
            delete x.id
            delete x.userId
        })

        const addressArr: UserAddress[] = []

        user.userAddress.map((x) => {
            const cities: City[] = require(`../../common/data/locate/${x.countryName}/cities`)
            const districts: District[] = require(`../../common/data/locate/${x.countryName}/districts`)

            console.log(cities)

            const address: UserAddress = {
                countryName: x.countryName,
                cityId: x.cityId,
                cityName: cities.find(y => y.code == x.cityId).name,
                districtId: x.districtId,
                districtName: districts.find(y => y.code == x.districtId).name,
                addressHome: x.addressHome
            }
            addressArr.push(address)
        })

        const result: UserProfileResult = {
            userId: user.userId,
            userFirstName: user.userFirstName,
            userLastName: user.userLastName,
            userEmail: user.userEmail,
            userPhone: user.userPhone,
            userAddress: addressArr
        }

        return result
    }
}