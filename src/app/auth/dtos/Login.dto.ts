import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";
import { BaseDTO } from "src/utils/base/dto.base";

export class LoginDTO extends BaseDTO {
    @Expose()
    @IsEmail()
    @IsNotEmpty()
    userEmail: string;

    @Expose()
    @IsNotEmpty()
    userPassword: string;
}