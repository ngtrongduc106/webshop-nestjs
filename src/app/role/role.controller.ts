import { Body, Controller, Get, Inject, Post, Put } from "@nestjs/common";
import { Controllers, Services } from "src/utils/constants";
import { iRoleService } from "./role";
import { CreateRoleDTO } from "./dtos/CreateRole.dto";
import { AddRolePermissionDTO } from "./dtos/AddRolePermission.dto";
import { AddUserRoleDTO } from "./dtos/AddUserRole.dto";

@Controller(Controllers.Role)
export class RoleController {
    constructor(
        @Inject(Services.Role) private roleService: iRoleService
    ) { }

    @Get()
    getAllRole() {
        return this.roleService.handleGetAllRole();
    }

    @Post()
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