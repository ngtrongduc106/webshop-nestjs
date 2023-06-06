import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import { Permission } from "src/utils/type";
import { IPermissionService } from "./permission";

@Injectable()
export class PermissionService implements IPermissionService {
    private readonly path: string = "./src/utils/data/permission/permission.json";

    getAllPermissions(): Permission[] {
        const read = fs.readFileSync(this.path);
        const permissions: Permission[] = JSON.parse(read.toString());

        return permissions;
    }

    getPermissionById(permissionId: string): Permission {
        const read = fs.readFileSync(this.path);
        const permissions: Permission[] = JSON.parse(read.toString());

        const result = permissions.find((permission) => permission.permissionId === permissionId);

        return result;
    }

    getPermissionByType(permissionType: string): Permission[] {
        const read = fs.readFileSync(this.path);
        const permissions: Permission[] = JSON.parse(read.toString());

        const result = permissions.filter((permission) => permission.permissionType == permissionType);

        return result
    }
}