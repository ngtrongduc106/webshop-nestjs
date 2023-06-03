import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { iAuthService } from "./auth";
import { AuthLoginDetail, AuthRegisterDetail, AuthResult, Permission } from "src/utils/type";
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { UsersEntity } from "src/database/entities/Users.entity";
import { RolesEntity } from "src/database/entities/Roles.entity";
import { DataSource, EntityManager, Repository } from "typeorm";
import { Services, Values } from "src/utils/constants";
import { UserAddressEntity } from "src/database/entities/UserAddress.entity";
import { RedisService } from "src/common/services/redis/redis.service";
import { BcryptService } from "src/common/services/bcrypt/bcrypt.service";
import { JwtCustomService } from "src/common/services/jwt/jwt.service";
import { EmailAlreadyExists, EmailOrPasswordIncorret } from "src/common/exceptions/auth.exception";

@Injectable()
export class AuthService implements iAuthService {
    constructor(
        @InjectRepository(UsersEntity) private userEntity: Repository<UsersEntity>,
        @InjectRepository(RolesEntity) private rolesEntity: Repository<RolesEntity>,
        @InjectRepository(UserAddressEntity) private userAddressEntity: Repository<UserAddressEntity>,
        @Inject(Values.Permission) private readonly permissionsValue: Permission[],
        @Inject(Services.Redis) private readonly redisService: RedisService,
        @Inject(Services.Bcrypt) private bcryptService: BcryptService,
        @Inject(Services.Jwt) private jwtCustomService: JwtCustomService,
        private dataSource: DataSource
    ) { }

    async handleLogin(data: AuthLoginDetail): Promise<AuthResult> {
        const user = await this.userEntity.findOne({
            where: {
                userEmail: data.userEmail,
                isActive: true
            },
            relations: ['roles', 'roles.permissions']
        })

        if (!user) {
            throw new EmailOrPasswordIncorret();
        }

        if (!this.bcryptService.handleCheck(user.userPassword, data.userPassword)) {
            throw new EmailOrPasswordIncorret();
        }

        const result = this.jwtCustomService.genAuthToken({ userId: user.userId })

        const roles: string[] = [];
        const permissions: string[] = [];

        user.roles.map((role) => {
            roles.push(role.roleName);
            role.permissions.map((permission) => {
                const permissionName = this.permissionsValue.find(x => x.permissionId == permission.permissionId)?.permissionName
                permissions.push(permissionName)
            })
        })

        await this.redisService.setProfile(user.userId, {
            roles: roles.toString(),
            permissions: permissions.toString(),
            refreshToken: result.refreshToken

        })

        return result
    }

    async handleRegister(data: AuthRegisterDetail): Promise<AuthResult> {
        const queryRunner = this.dataSource.createQueryRunner()

        await queryRunner.connect()
        await queryRunner.startTransaction()

        try {
            const user = this.userEntity.create({
                userEmail: data.userEmail,
                userPassword: await this.bcryptService.handleEncrypt(data.userPassword),
                userFirstName: data.userFirstName,
                userLastName: data.userLastName,
                userPhone: data.userPhone
            })

            const resultUser = await queryRunner.manager.save(user)

            const userAddress = this.userAddressEntity.create({
                userId: resultUser.userId,
                countryName: data.countryName,
                cityId: data.cityId,
                districtId: data.districtId,
                addressHome: data.addressHome
            })

            await queryRunner.manager.save(userAddress)

            await queryRunner.commitTransaction()

            const result = this.jwtCustomService.genAuthToken({ userId: resultUser.userId })

            await this.redisService.setProfile(resultUser.userId, {
                refreshToken: result.refreshToken
            })

            return result
        } catch (error) {
            await queryRunner.rollbackTransaction()
            if (error.errno == 1062) {
                throw new EmailAlreadyExists();
            }
            throw new HttpException("Something went wrong", HttpStatus.BAD_REQUEST)
        } finally {
            await queryRunner.release()
        }
    }
}