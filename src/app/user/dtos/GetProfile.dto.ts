import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";
import { BaseDTO } from "src/utils/base/dto.base";

export class GetProfileDTO extends BaseDTO {
    @Expose()
    @IsNotEmpty()
    userId: string;

    @Expose()
    userEmail: string;
}