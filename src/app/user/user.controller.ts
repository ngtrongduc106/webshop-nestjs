import { Body, Controller, Get, Inject, Post, Request, SetMetadata, UseGuards } from "@nestjs/common";
import { Controllers, Services } from "src/utils/constants";
import { iUserService } from "./user";
import { AuthGuard } from "src/guards/auth.guard";
import { TokenDTO } from "./dtos/Token.dto";
import { UserProfileResult } from "src/utils/type";
import { PermissionGuard } from "src/guards/permission.guard";

@Controller(Controllers.User)
export class UserController {
    constructor(
        @Inject(Services.User) private userService: iUserService
    ) { }

    @Get('profile')
    @UseGuards(PermissionGuard)
    @UseGuards(AuthGuard)
    async profile(@Request() data: TokenDTO): Promise<UserProfileResult> {
        return await this.userService.handleProfile(TokenDTO.plainToClass(data))
    }

}