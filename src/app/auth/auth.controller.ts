import { Body, Controller, HttpCode, Inject, Post } from "@nestjs/common";
import { Controllers, Services } from "src/utils/constants";
import { IAuthService } from "./auth";
import { LoginDTO } from "./dtos/Login.dto";
import { RegisterDTO } from "./dtos/Register.dto";

@Controller(Controllers.Auth)
export class AuthController {
    constructor(
        @Inject(Services.Auth) private readonly authService: IAuthService
    ) { }

    @Post('login')
    @HttpCode(200)
    async login(@Body() data: LoginDTO) {
        return this.authService.handleLogin(LoginDTO.plainToClass(data));
    }

    @Post('register')
    async register(@Body() data: RegisterDTO) {
        return this.authService.handleRegister(RegisterDTO.plainToClass(data));
    }
}