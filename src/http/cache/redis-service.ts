import Redis from "ioredis";

export class RedisService extends Redis {
  constructor() {
    super({
      host: process.env.REDIS_HOST || "127.0.0.1",
      port: Number(process.env.REDIS_PORT) || 6379,
      db: Number(process.env.REDIS_DB) || 0,
    });
  }
}
