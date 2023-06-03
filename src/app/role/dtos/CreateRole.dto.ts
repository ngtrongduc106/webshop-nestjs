import { Expose, Type } from "class-transformer";
import { IsArray, IsNotEmpty, ValidateNested } from "class-validator";
import { BaseDTO } from "src/common/dto.base";

export class CreateRoleDTO extends BaseDTO {
    @Expose()
    @IsNotEmpty()
    roleName: string

    @Expose()
    @ValidateNested({ each: true })
    @Type(() => PermissionValidator)
    permissions: PermissionValidator[]
}

class PermissionValidator {
    @Expose()
    permissionId: string
}