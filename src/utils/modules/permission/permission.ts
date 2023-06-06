import { Permission } from "src/utils/type"

export interface IPermissionService {
    getAllPermissions(): Permission[]

    getPermissionById(permissionId: string): Permission

    getPermissionByType(permissionType: string): Permission[]
}