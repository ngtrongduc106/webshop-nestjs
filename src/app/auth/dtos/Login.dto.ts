import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";
import { BaseDTO } from "src/common/dto.base";

export class LoginDTO extends BaseDTO {
    @Expose()
    @IsNotEmpty()
    @IsEmail()
    userEmail: string

    @Expose()
    @IsNotEmpty()
    userPassword: string
}