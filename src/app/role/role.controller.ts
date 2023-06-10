import { Controller, Get, Post, Put, UseGuards } from "@nestjs/common";
import { AuthenGuard } from "src/guards/authen/authen.guard";
import { Controllers } from "src/utils/constants";

@Controller(Controllers.Role)
@UseGuards(AuthenGuard)
export class RoleController {
    @Get()
    getAllRoles() { }

    @Post()
    addNewRole() { }

    @Put()
    addRolePermission() { }
}