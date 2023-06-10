import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { Observable } from "rxjs";
import { Services } from "src/utils/constants";
import { ACCESS_KEY } from "src/utils/decoraters/access.dercorater";
import { IRedisService } from "src/utils/modules/redis/redis";

@Injectable()
export class AuthorGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        @Inject(Services.Redis) private readonly redisService: IRedisService
    ) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req: Request = context.switchToHttp().getRequest();
        const userId = req.userId;

        if (!userId) {
            throw new UnauthorizedException();
        }

        const accessPermission = this.reflector.getAllAndMerge<string[]>(ACCESS_KEY, [
            context.getClass(),
            context.getHandler(),
        ])

        const cachePermission: string[] = (await this.redisService.getUser(userId)).permissions ? (await this.redisService.getUser(userId)).permissions.split(',') : [];

        console.log(cachePermission)

        return true;
    }
}