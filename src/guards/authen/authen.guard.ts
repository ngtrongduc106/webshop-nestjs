/*
https://docs.nestjs.com/guards#guards
*/

import { Injectable, CanActivate, ExecutionContext, Inject, UnauthorizedException, HttpException } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Services } from 'src/utils/constants';
import { IJwtCustomService } from 'src/utils/modules/jwt/jwt';

@Injectable()
export class AuthenGuard implements CanActivate {
  constructor(
    @Inject(Services.Jwt) private readonly jwtService: IJwtCustomService
  ) { }
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const auth = request.headers.authorization;

    if (!auth || !auth.startsWith("Bearer ")) {
      throw new UnauthorizedException();
    }

    const token = auth.split(' ')[1];

    try {
      const payLoad = this.jwtService.handleDecodeAuthToken(token)
      request.userId = payLoad.userId;
      request.userEmail = payLoad.userEmail;

      return true
    } catch (error) {
      if (error.message == "jwt expired") {
        throw new HttpException("Token expired", 402)
      }
      throw new UnauthorizedException();
    }
  }

}
