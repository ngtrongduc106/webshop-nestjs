import { Inject, Injectable } from "@nestjs/common";
import { IRedisService } from "./redis";
import * as redis from "redis";
import { RedisClientType } from "@redis/client";
import { Redis_User } from "src/utils/type";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class RedisService implements IRedisService {
    private redisClient: RedisClientType;

    constructor(
        @Inject(ConfigService) private configService: ConfigService
    ) {
        this.redisClient = redis.createClient({
            url: configService.get<string>("Redis_URL")
        })

        this.connect();
    }

    async connect() {
        await this.redisClient.connect();
    }

    async setUser(key: string, value: Redis_User): Promise<boolean> {
        try {
            await this.redisClient.hSet(key, value);
            await this.redisClient.expire(key, 60 * 60 * 24 * 365);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async getUser(key: string): Promise<Redis_User | null> {
        try {
            const result: Redis_User = await this.redisClient.hGetAll(key);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

}