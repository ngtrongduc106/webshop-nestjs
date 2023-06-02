import { Body, Controller, Get, Inject, Post, Request, UseGuards } from "@nestjs/common";
import { Controllers, Services } from "src/utils/constants";
import { iUserService } from "./user";
import { AuthGuard } from "src/guards/auth.guard";
import { TokenDTO } from "./dtos/Token.dto";
import { RedisProfile } from "src/utils/type";

@Controller(Controllers.User)
export class UserController {
    constructor(
        @Inject(Services.User) private userService: iUserService
    ) { }

    @Get('profile')
    @UseGuards(AuthGuard)
    async profile(@Request() data: TokenDTO) {
        return await this.userService.handleProfile(TokenDTO.plainToClass(data))
    }

}