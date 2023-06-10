import { Controller, Get, Inject, Post, Request, UseGuards } from "@nestjs/common";
import { Controllers, Services } from "src/utils/constants";
import { IUserService } from "./user";
import { AuthenGuard } from "src/guards/authen/authen.guard";
import { GetProfileDTO } from "./dtos/GetProfile.dto";
import { Access } from "src/utils/decoraters/access.dercorater";
import { AuthorGuard } from "src/guards/author/author.guard";

@Controller(Controllers.User)
@Access("class")
@UseGuards(AuthenGuard)
export class UserController {
    constructor(
        @Inject(Services.User) private readonly userService: IUserService
    ) { }

    @Get('profile')
    async getProfile(@Request() data: GetProfileDTO) {
        return await this.userService.handleGetProfile(GetProfileDTO.plainToClass(data));
    }

    @Post('test')
    @UseGuards(AuthorGuard)
    @Access("method1")
    test() {
        return "hehe"
    }

    @Post('test2')
    @UseGuards(AuthorGuard)
    @Access("method2")
    test2() {
        return "hehe"
    }
}