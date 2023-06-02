import { Injectable } from "@nestjs/common";
import { RedisClientType } from "redis";
import * as redis from "redis";
import * as dotenv from "dotenv";
import { RedisProfile } from "src/utils/type";
dotenv.config();

@Injectable()
export class RedisService {
    private client: RedisClientType;
    constructor() {
        this.client = redis.createClient({
            url: process.env.REDIS_URL
        })
        this.client.connect();
    }

    async setProfile(key: string, redisProfile: RedisProfile) {
        await this.client.hSet(key, redisProfile);
        await this.client.expire(key, 60 * 60 * 24 * 365);
    }

    async getProfile(key: string) {
        return await this.client.hGetAll(key);
    }

}