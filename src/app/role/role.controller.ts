import { Body, Controller, Get, Inject, Post, Put, SetMetadata, UseGuards } from "@nestjs/common";
import { Controllers, Services } from "src/utils/constants";
import { iRoleService } from "./role";
import { CreateRoleDTO } from "./dtos/CreateRole.dto";
import { AddRolePermissionDTO } from "./dtos/AddRolePermission.dto";
import { AddUserRoleDTO } from "./dtos/AddUserRole.dto";
import { PermissionGuard } from "src/guards/permission.guard";
import { AuthGuard } from "src/guards/auth.guard";
import { UsePermission } from "src/common/decoraters/usePermission.decorater";

@Controller(Controllers.Role)
@UseGuards(AuthGuard)
export class RoleController {
    constructor(
        @Inject(Services.Role) private roleService: iRoleService
    ) { }

    @Get()
    @UseGuards(PermissionGuard)
    @UsePermission('view-role')
    getAllRole() {
        return this.roleService.handleGetAllRole();
    }

    @Post()
    @UseGuards(PermissionGuard)
    @UsePermission(['view-role', 'create-role'])
    addRole(@Body() data: CreateRoleDTO) {
        return this.roleService.handleAddRole(CreateRoleDTO.plainToClass(data));
    }

    @Get('permissions')
    getAllPermission() {
        return this.roleService.handleGetAllPermission();
    }

    @Put('permissions')
    addRolePermission(@Body() data: AddRolePermissionDTO) {
        return this.roleService.handleAddRolePermission(AddRolePermissionDTO.plainToClass(data));
    }

    @Post('user')
    addUserRole(@Body() data: AddUserRoleDTO) {
        return this.roleService.handleAddUserRole(AddUserRoleDTO.plainToClass(data));
    }
}