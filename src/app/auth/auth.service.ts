import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { IAuthService } from "./auth";
import { Auth_LoginDetails, Jwt_TokenPayload, Auth_RegisterDetails, Permission } from "src/utils/type";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/database/entities/User.entity";
import { Repository } from "typeorm";
import { Services } from "src/utils/constants";
import { IBcryptService } from "src/utils/modules/bcrypt/bcrypt";
import { IJwtCustomService } from "src/utils/modules/jwt/jwt";
import { IRedisService } from "src/utils/modules/redis/redis";
import { UserAddressEntity } from "src/database/entities/UserAddress.entity";
import { IPermissionService } from "src/utils/modules/permission/permission";
import { RolePermission } from "src/database/entities/RolePermission.entity";

@Injectable()
export class AuthService implements IAuthService {
    constructor(
        @InjectRepository(UserEntity) private readonly userEntity: Repository<UserEntity>,
        @InjectRepository(UserAddressEntity) private readonly userAddressEntity: Repository<UserAddressEntity>,
        @Inject(Services.Bcrypt) private readonly bcryptService: IBcryptService,
        @Inject(Services.Jwt) private readonly jwtService: IJwtCustomService,
        @Inject(Services.Redis) private readonly redisService: IRedisService,
        @Inject(Services.Permission) private readonly permissionService: IPermissionService
    ) { }

    async handleLogin(data: Auth_LoginDetails): Promise<Jwt_TokenPayload> {
        const user = await this.userEntity.findOne({
            where: {
                userEmail: data.userEmail,
                isActive: true
            },
            relations: ['roles']
        });

        if (!user) {
            throw new HttpException("Email or Password incorrect !", HttpStatus.BAD_REQUEST);
        }

        if (!this.bcryptService.handleCheck(data.userPassword, user.userPassword)) {
            throw new HttpException("Email or Password incorrect !", HttpStatus.BAD_REQUEST);
        }

        const permissions: string[] = [];
        const allPermisison = this.permissionService.getAllPermissions();
        user.roles.map((role) => {
            role.permissions.map((permisson: RolePermission) => {
                const foundPermission = allPermisison.find(x => x.permissionId === permisson.permissionId);
                const perName: string = foundPermission ? foundPermission.permissionName : null;

                if (perName) {
                    permissions.push(perName);
                }
            })
        })

        const result: Jwt_TokenPayload = this.jwtService.handleEncodeAuthToken({
            userId: user.userId,
            userEmail: user.userEmail
        })

        const setCache = this.redisService.setUser(user.userId, {
            userId: user.userId,
            userEmail: user.userEmail,
            refreshToken: result.refreshToken
        })

        if (!setCache) {
            throw new HttpException("", HttpStatus.BAD_REQUEST)
        }

        return result
    }
    async handleRegister(data: Auth_RegisterDetails): Promise<Jwt_TokenPayload> {
        const existing = await this.userEntity.findOne({
            where: {
                userEmail: data.userEmail,
            }
        });

        if (existing) {
            throw new HttpException("Email or Password incorrect !", HttpStatus.BAD_REQUEST);
        }

        const user = this.userEntity.create({
            userEmail: data.userEmail,
            userFirstName: data.userFirstName,
            userLastName: data.userLastName,
            userPassword: await this.bcryptService.handleHash(data.userPassword),
            userPhone: data.userPhone
        });

        const resultUser = await this.userEntity.save(user);

        if (!resultUser) {
            throw new HttpException("Provide incorrect !", HttpStatus.BAD_REQUEST);
        }

        const userAddress = this.userAddressEntity.create({
            userId: resultUser.userId,
            country: data.country,
            cityId: data.cityId,
            districtId: data.districtId,
            homeAddress: data.addressHome
        })

        await this.userAddressEntity.save(userAddress)

        const result: Jwt_TokenPayload = this.jwtService.handleEncodeAuthToken({
            userId: resultUser.userId,
            userEmail: resultUser.userEmail
        })

        const setCache = this.redisService.setUser(user.userId, {
            userId: resultUser.userId,
            userEmail: resultUser.userEmail
        })

        if (!setCache) {
            throw new HttpException("", HttpStatus.BAD_REQUEST)
        }

        return result
    }

}