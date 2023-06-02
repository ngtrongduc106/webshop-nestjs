import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";
import { Match } from "src/common/decoraters/match.decorater";
import { BaseDTO } from "src/common/dto.base";

export class RegisterDTO extends BaseDTO {
    @Expose()
    @IsNotEmpty()
    @IsEmail()
    userEmail: string

    @Expose()
    @IsNotEmpty()
    userPassword: string

    @IsNotEmpty()
    @Match('userPassword')
    userPasswordConfirm: string

    @Expose()
    @IsNotEmpty()
    userFirstName: string

    @IsNotEmpty()
    @Expose()
    userLastName: string

    @IsNotEmpty()
    @Expose()
    userPhone: string

    @IsNotEmpty()
    @Expose()
    countryName: string

    @IsNotEmpty()
    @Expose()
    cityId: string

    @IsNotEmpty()
    @Expose()
    districtId: string

    @IsNotEmpty()
    @Expose()
    addressHome: string
}