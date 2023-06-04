import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { RedisService } from "src/common/services/redis/redis.service";
import { Services } from "src/utils/constants";
import * as dotenv from "dotenv";
dotenv.config();

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(
        @Inject(Services.Redis) private redisService: RedisService,
        private reflector: Reflector
    ) { }

    async canActivate(context: ExecutionContext) {
        const req: Request = context.switchToHttp().getRequest();

        const userId = req.user.userId;
        const userEmail = req.user.userEmail;

        const permission = this.reflector.get<string[]>('permission', context.getHandler());

        const userProfile = await this.redisService.getProfile(userId)

        const permissionProfile = userProfile.permissions.split(',')

        if (process.env.SUPERADMIN == userEmail) {
            return true
        }

        if (Array.isArray(permission)) {
            permission.map((x) => {
                permissionProfile.map((y) => {
                    if (y.toLowerCase() !== x.toLowerCase()) {
                        return false
                    }
                })
            })
        } else {
            if (!permissionProfile.includes(permission)) {
                return false
            }
        }

        return true
    }
}