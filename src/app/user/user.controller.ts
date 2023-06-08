import { Controller, Get, Inject, Request, UseGuards } from "@nestjs/common";
import { Controllers, Services } from "src/utils/constants";
import { IUserService } from "./user";
import { AuthenGuard } from "src/guards/authen.guard";
import { GetProfileDTO } from "./dtos/GetProfile.dto";

@Controller(Controllers.User)
export class UserController {
    constructor(
        @Inject(Services.User) private readonly userService: IUserService
    ) { }

    @Get('profile')
    @UseGuards(AuthenGuard)
    async getProfile(@Request() data: GetProfileDTO) {
        return await this.userService.handleGetProfile(GetProfileDTO.plainToClass(data));
    }
}