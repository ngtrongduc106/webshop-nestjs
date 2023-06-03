import { Expose, Type } from "class-transformer";
import { IsNotEmpty, ValidateNested } from "class-validator";
import { BaseDTO } from "src/common/dto.base";

export class AddRolePermissionDTO extends BaseDTO {
    @Expose()
    @IsNotEmpty()
    roleId: string

    @Expose()
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => PermissionValidator)
    permissions: PermissionValidator[]
}

class PermissionValidator {
    @Expose()
    permissionId: string
}