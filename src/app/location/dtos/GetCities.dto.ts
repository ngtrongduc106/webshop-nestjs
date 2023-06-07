import { Expose } from "class-transformer";
import { IsNotEmpty, Matches } from "class-validator";
import { BaseDTO } from "src/utils/base/dto.base";

export class GetCitiesDTO extends BaseDTO {
    @Expose()
    @IsNotEmpty()
    @Matches(/^[a-zA-Z]+$/, { message: 'Only letters are allowed' })
    country: string;
}