import { CanActivate, ExecutionContext, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";
import { JwtCustomService } from "src/common/services/jwt/jwt.service";
import { Services } from "src/utils/constants";
import { PayLoadJwt } from "src/utils/type";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        @Inject(Services.Jwt) private jwtCustomService: JwtCustomService
    ) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req: Request = context.switchToHttp().getRequest()

        const auth = req.headers.authorization

        if (!auth || !auth.startsWith('Bearer ')) {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }

        const token = auth.split(' ')[1];

        try {
            const payLoad: PayLoadJwt = this.jwtCustomService.verifyAuthToken(token)
            req.user = payLoad
            return true
        } catch (error) {
            if (error.message == "jwt expired") {
                throw new HttpException("Token expired", 402)
            }
            console.log(error)
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
    }
}