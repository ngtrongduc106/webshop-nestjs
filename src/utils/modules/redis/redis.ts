import { Redis_User } from "src/utils/type";

export interface IRedisService {
    setUser(key: string, value: Redis_User): Promise<boolean>

    getUser(key: string): Promise<Redis_User | null>
}