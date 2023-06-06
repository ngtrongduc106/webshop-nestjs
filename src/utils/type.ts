export type Redis_User = {
    userId?: string;
    userEmail?: string;
    roles?: string;
    permissions?: string;
    refreshToken?: string;
}

export type Jwt_UserPayload = {
    userId: string;
    userEmai: string;
}

export type Jwt_TokenPayload = {
    accessToken: string;
    refreshToken: string;
}