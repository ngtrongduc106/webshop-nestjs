import { Expose } from "class-transformer";
import { IsNotEmpty, IsUUID } from "class-validator";
import { BaseDTO } from "src/common/dto.base";

export class AddUserRoleDTO extends BaseDTO {
    @Expose()
    @IsNotEmpty()
    @IsUUID()
    userId: string

    @Expose()
    @IsNotEmpty()
    roleId: string[] | string
}