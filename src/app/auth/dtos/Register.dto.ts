import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";
import { BaseDTO } from "src/utils/base/dto.base";

export class RegisterDTO extends BaseDTO {
    @Expose()
    @IsEmail()
    @IsNotEmpty()
    userEmail: string;

    @Expose()
    @IsNotEmpty()
    userPassword: string;

    @Expose()
    @IsNotEmpty()
    userFirstName: string;

    @Expose()
    @IsNotEmpty()
    userLastName: string;

    @Expose()
    @IsNotEmpty()
    userPhone: string;

    @Expose()
    @IsNotEmpty()
    country: string;

    @Expose()
    @IsNotEmpty()
    cityId: string;

    @Expose()
    @IsNotEmpty()
    districtId: string;

    @Expose()
    @IsNotEmpty()
    addressHome: string;
}