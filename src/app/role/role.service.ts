import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { iRoleService } from "./role";
import { Values } from "src/utils/constants";
import { Permission, Role_AddRolePermissionDetails, Role_CreateRoleDetails, Role_AddUserRoleDetails } from "src/utils/type";
import { InjectRepository } from "@nestjs/typeorm";
import { RolesEntity } from "src/database/entities/Roles.entity";
import { In, Repository } from "typeorm";
import { RoleHasPermissionEntity } from "src/database/entities/RoleHasPermission.entity";
import { UsersEntity } from "src/database/entities/Users.entity";

@Injectable()
export class RolesService implements iRoleService {
    constructor(
        @Inject(Values.Permission) private readonly permissions: Permission[],
        @InjectRepository(RolesEntity) private roleEntity: Repository<RolesEntity>,
        @InjectRepository(RoleHasPermissionEntity) private roleHasPermissionEntity: Repository<RoleHasPermissionEntity>,
        @InjectRepository(UsersEntity) private userEntity: Repository<UsersEntity>
    ) { }
    handleGetAllRole() {
        const roles = this.roleEntity.find({
            where: {
                deletedAt: null
            },
            relations: ['permissions'],
            select: ['roleId', 'roleName', 'permissions']
        })

        return roles
    }
    handleGetAllPermission() {
        return this.permissions
    }

    async handleAddRole(data: Role_CreateRoleDetails) {
        try {
            const role = this.roleEntity.create({
                roleName: data.roleName
            })

            const resultRole = await this.roleEntity.save(role)

            const permissionArr: RoleHasPermissionEntity[] = []

            data.permissions.map((x) => {
                const permissionEntity = this.roleHasPermissionEntity.create({
                    roleId: resultRole.roleId,
                    permissionId: x.permissionId
                })
                permissionArr.push(permissionEntity)
            })

            await this.roleHasPermissionEntity.save(permissionArr)

            return role
        } catch (error) {
            if (error.errno == 1062) {
                throw new HttpException("Role already exists", HttpStatus.BAD_REQUEST)
            }
            throw new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    async handleAddRolePermission(data: Role_AddRolePermissionDetails) {
        const role = await this.roleEntity.findOne({
            where: {
                roleId: data.roleId
            },
            relations: ['permissions']
        })

        role.permissions.map((x) => {
            delete x.id
        })

        if (!role) return new HttpException("Role not found", HttpStatus.NOT_FOUND)

        const permissions: RoleHasPermissionEntity[] = []

        data.permissions.map((x) => {
            const per = this.roleHasPermissionEntity.create({
                roleId: role.roleId,
                permissionId: x.permissionId
            })
            permissions.push(per)
        })

        role.permissions.map((x) => {
            const dumIndex = permissions.findIndex(y => y.permissionId == x.permissionId)
            permissions.splice(dumIndex, 1)
        })

        try {
            const addPer = await this.roleHasPermissionEntity.save(permissions)

            return addPer
        } catch (error) {
            console.log(error)
            throw new HttpException("Something went wrong", HttpStatus.BAD_REQUEST)
        }
    }

    async handleAddUserRole(data: Role_AddUserRoleDetails) {
        const user = await this.userEntity.findOne({
            where: {
                userId: data.userId,
                deletedAt: null,
                isActive: true
            },
            relations: ["roles"]
        })

        console.log(user)

        if (!user) {
            throw new HttpException("User not found", HttpStatus.BAD_REQUEST)
        }

        const roleIsArr = Array.isArray(data.roleId) ? data.roleId : [data.roleId]

        const role = await this.roleEntity.find({
            where: {
                roleId: In(roleIsArr)
            }
        })

        if (!role) {
            throw new HttpException("Role not found", HttpStatus.BAD_REQUEST)
        }

        const userRoles = [...user.roles, ...role]

        user.roles = userRoles

        const result = await this.userEntity.save(user)

        return result
    }

}