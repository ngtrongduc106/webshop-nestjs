import { Injectable } from "@nestjs/common";
import { IRedisService } from "./redis";
import * as redis from "redis";
import { RedisClientType } from "@redis/client";
import { Redis_User } from "src/utils/type";

@Injectable()
export class RedisService implements IRedisService {
    private redisClient: RedisClientType;

    constructor() {
        this.redisClient = redis.createClient({
            url: "redis://127.0.0.1:6379"
        })

        this.connect();
    }

    async connect() {
        await this.redisClient.connect();
    }

    async setUser(key: string, value: Redis_User): Promise<boolean> {
        try {
            await this.redisClient.hSet(key, value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async getUser(key: string): Promise<Redis_User | null> {
        try {
            const result = await this.redisClient.hGetAll(key);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

}