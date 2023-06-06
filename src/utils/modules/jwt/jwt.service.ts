import { Injectable } from "@nestjs/common";
import { IJwtCustomService } from "./jwt";
import { JwtService } from "@nestjs/jwt";
import { Jwt_TokenPayload, Jwt_UserPayload } from "src/utils/type";

@Injectable()
export class JwtCustomService implements IJwtCustomService {
    constructor(
        private jwtService: JwtService
    ) { }

    handleEncodeAuthToken(payLoad: Jwt_UserPayload): Jwt_TokenPayload {
        const accessToken = this.jwtService.sign(payLoad);
        const refreshToken = this.jwtService.sign(payLoad, { expiresIn: 60 * 60 * 24 * 365 });

        return { accessToken, refreshToken };
    }

    handleDecodeAuthToken(token: string): Jwt_UserPayload {
        const user: Jwt_UserPayload = this.jwtService.verify(token);

        return user;
    }
}