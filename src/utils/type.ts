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