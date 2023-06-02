import { plainToClass } from "class-transformer";

export abstract class BaseDTO {
    static plainToClass<T>(this: new (...args: any[]) => T, obj: T): T {
        return plainToClass(this, obj, { excludeExtraneousValues: true });
    }
}