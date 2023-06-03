import { Role_AddRolePermissionDetails, Role_CreateRoleDetails, Role_AddUserRoleDetails } from "src/utils/type"

export interface iRoleService {
    handleGetAllRole()

    handleGetAllPermission()

    handleAddRole(data: Role_CreateRoleDetails)

    handleAddRolePermission(data: Role_AddRolePermissionDetails)

    handleAddUserRole(data: Role_AddUserRoleDetails)

}