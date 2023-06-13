import { Controller, Get, Inject, Post, Put, UseGuards } from "@nestjs/common";
import { AuthenGuard } from "src/guards/authen/authen.guard";
import { Controllers, Services } from "src/utils/constants";
import { IRoleService } from "./role";

@Controller(Controllers.Role)
@UseGuards(AuthenGuard)
export class RoleController {
    constructor(
        @Inject(Services.Role) private readonly roleService: IRoleService
    ) { }

    @Get()
    async getAllRoles() {
        return this.roleService.handleGetAllRoles();
    }

    @Get('permissions')
    getAllPermissions() {
        return this.roleService.handleGetAllPermissions();
    }

    @Post()
    addNewRole() { }

    @Put()
    addRolePermission() { }
}