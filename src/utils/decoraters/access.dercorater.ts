import { SetMetadata } from '@nestjs/common';

export const ACCESS_KEY = "access-key";
export const Access = (...permission: string[]) => SetMetadata(ACCESS_KEY, permission);