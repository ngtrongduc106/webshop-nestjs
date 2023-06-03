import { Body, Controller, HttpCode, Inject, Post, Redirect } from "@nestjs/common";
import { Controllers, Services } from "src/utils/constants";
import { LoginDTO } from "./dtos/Login.dto";
import { RegisterDTO } from "./dtos/Register.dto";
import { iAuthService } from "./auth";

@Controller(Controllers.Auth)
export class AuthController {
    constructor(
        @Inject(Services.Auth) private readonly authService: iAuthService
    ) { }

    @Post('login')
    @HttpCode(200)
    async login(@Body() data: LoginDTO) {
        return await this.authService.handleLogin(LoginDTO.plainToClass(data))
    }

    @Post('register')
    async register(@Body() data: RegisterDTO) {
        return await this.authService.handleRegister(RegisterDTO.plainToClass(data))
    }
}