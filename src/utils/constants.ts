export enum Services {
    Redis = "RedisCustom-service",
    Jwt = "JwtCustom-service",
    Bcrypt = "Bcrypt-service",
    Permission = "Permission-service",
    Locate = "Locate-service",
    Auth = "Auth-service",
    Location = "Location-service",
    User = "User-service",
    Role = "Role-service"
}

export enum Controllers {
    Auth = "auth",
    Location = "location",
    User = "user",
    Role = "role"
}

export enum Guards {
    Authen = "authen-guard",
    Author = "author-guard"
}