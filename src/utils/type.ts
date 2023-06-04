export type City = {
    name: string
    slug: string
    type: string
    name_with_type: string
    code: string
}

export type District = {
    name: string,
    type: string,
    slug: string,
    name_with_type: string,
    path: string,
    path_with_type: string,
    code: string,
    parent_code: string
}

export type PayLoadJwt = {
    userId: string
    userEmail: string
}

export type Permission = {
    permissionId: string
    permissionName: string
}

export type RedisProfile = {
    roles?: string
    permissions?: string
    refreshToken?: string
}

export type AuthResult = {
    accessToken: string
    refreshToken: string
}

export type AuthLoginDetail = {
    userEmail: string
    userPassword: string
}

export type AuthRegisterDetail = {
    userEmail: string
    userPassword: string
    userFirstName: string
    userLastName: string
    userPhone: string
    countryName: string
    cityId: string
    districtId: string
    addressHome: string
}

export type UserProfileResult = {
    userId: string
    userEmail: string
    userFirstName: string
    userLastName: string
    userPhone: string
    userAddress: UserAddress[]
}

export type UserAddress = {
    countryName: string
    cityId: string
    cityName: string
    districtId: string
    districtName: string
    addressHome: string
}

export type Role_CreateRoleDetails = {
    roleName: string
    permissions?: {
        permissionId: string
    }[]
}

export type Role_AddRolePermissionDetails = {
    roleId: string
    permissions?: {
        permissionId: string
    }[]
}

export type Role_AddUserRoleDetails = {
    userId: string
    roleId: string[] | string
}