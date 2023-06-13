import { Inject, Injectable } from "@nestjs/common";
import { IRoleService } from "./role";
import { InjectRepository } from "@nestjs/typeorm";
import { RoleEntity } from "src/database/entities/Role.entity";
import { Repository } from "typeorm";
import { Services } from "src/utils/constants";
import { IPermissionService } from "src/utils/modules/permission/permission";

@Injectable()
export class RoleService implements IRoleService {
    constructor(
        @InjectRepository(RoleEntity) private readonly roleEntity: Repository<RoleEntity>,
        @Inject(Services.Permission) private readonly permissionService: IPermissionService
    ) { }

    async handleGetAllRoles() {
        const roles = await this.roleEntity.find({
            where: {
                deletedAt: null
            },
            relations: ['permissions'],
            select: ['roleId', 'roleName', 'permissions']
        });

        return roles;
    }

    handleGetAllPermissions() {
        const permissions = this.permissionService.getAllPermissions();

        return permissions;
    }
}