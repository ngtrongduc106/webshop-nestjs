export type Redis_User = {
    userId?: string;
    userEmail?: string;
    roles?: string;
    permissions?: string;
    refreshToken?: string;
}

export type Jwt_UserPayload = {
    userId: string;
    userEmail: string;
}

export type Jwt_TokenPayload = {
    accessToken: string;
    refreshToken: string;
}

export type Permission = {
    permissionId: string;
    permissionType: string;
    permissionName: string;
}

export type Locate_City = {
    name: string;
    slug: string;
    type: string;
    name_with_type: string;
    cityId: string;
}

export type Locate_District = {
    name: string;
    type: string;
    slug: string;
    name_with_type: string;
    path: string;
    path_with_type: string;
    districtId: string;
    cityId: string;
}


export type Auth_LoginDetails = {
    userEmail: string;
    userPassword: string;
}

export type Auth_RegisterDetails = {
    userEmail: string;
    userPassword: string;
    userFirstName: string;
    userLastName: string;
    userPhone: string;
    country: string;
    cityId: string;
    districtId: string;
    addressHome: string;
}