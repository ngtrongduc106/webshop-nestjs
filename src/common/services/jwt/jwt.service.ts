import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthResult, PayLoadJwt } from "src/utils/type";

@Injectable()
export class JwtCustomService {
    constructor(
        private jwtService: JwtService
    ) { }

    genAuthToken(payLoad: PayLoadJwt): AuthResult {
        const accessToken = this.jwtService.sign(payLoad)
        const refreshToken = this.jwtService.sign(payLoad, { expiresIn: 60 * 60 * 24 * 365 })

        return { accessToken, refreshToken }
    }

    verifyAuthToken(token: string): PayLoadJwt {
        const result = this.jwtService.verify(token)

        return result
    }
}