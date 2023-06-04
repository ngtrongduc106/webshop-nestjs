import { SetMetadata } from "@nestjs/common";

export const UsePermission = (permission: string[] | string) => SetMetadata('permission', permission)