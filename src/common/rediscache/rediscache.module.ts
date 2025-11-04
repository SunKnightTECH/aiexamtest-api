import { Global, Module } from "@nestjs/common";
import { RedisCacheService } from "./rediscache.service";
import { ConfigService } from "@nestjs/config";
import { RedisModule } from "@liaoliaots/nestjs-redis";
@Global()
@Module({
    imports: [
        RedisModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => {
                return {
                    config: config.get("redisconfig"),
                };
            },
        }),
    ],
    providers: [RedisCacheService],
    exports: [RedisCacheService],
})
export class RedisCacheModule {}
