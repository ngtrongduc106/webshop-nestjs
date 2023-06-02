import { Expose } from "class-transformer";
import { BaseDTO } from "src/common/dto.base";

export class TokenDTO extends BaseDTO {
    @Expose()
    user: {
        userId: string;
    }
}