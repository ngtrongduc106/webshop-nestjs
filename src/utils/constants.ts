export enum Controllers {
    Auth = "auth",
    User = "user",
}

export enum Services {
    Auth = "auth_service",
    User = "user_service",
    Redis = "redis_service",
    Jwt = "jwt_service",
    Bcrypt = "bcrypt_service"
}

export enum Values {
    Permission = "Permission_value"
}

export enum Guards {
    auth = "auth_guard",
    permission = "permission_guard"
}