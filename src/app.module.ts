import { Module, RequestMethod } from "@nestjs/common";
import { RedisCacheModule } from "./common/rediscache/rediscache.module";
import { ThrottlerModule, ThrottlerGuard } from "@nestjs/throttler";
import { ConfigService, ConfigModule } from "@nestjs/config";
import { JwtAuthGuard } from "./common/auth/auth.guard";
import { MiddlewareConsumer } from "@nestjs/common";
import customConfig from "./common/config";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./common/auth/jwt.strategy";
import { RolesGuard } from "./common/auth/roles.guard";
import { Reflector } from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./controller/auth/auth.module";
import { CommonModule } from "./controller/common/common.module";

@Module({
    imports: [
        ThrottlerModule.forRoot([
            {
                ttl: 6000, // time-to-live 每个请求计数记录的生存时间（毫秒）
                limit: 300, // 给定时间段内允许的最大请求数
            },
        ]),
        JwtModule.registerAsync({
            global: true,
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const config = configService.get("jwtconfig");
                return {
                    secret: config.secret,
                    signOptions: config.signOptions,
                };
            },
        }),
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
            load: [customConfig],
        }),
        MongooseModule.forRootAsync({
            useFactory: async (configService: ConfigService) => configService.get("mongoDBConfig"),
            inject: [ConfigService],
        }),
        //RedisCacheModule,
        AuthModule,
        CommonModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard, //@SkipThrottle()跳过节流
        },
        JwtStrategy,
        Reflector,
    ],
})
export class AppModule {
    constructor(private readonly configService: ConfigService) {
        this.configService = configService;
    }
    configure(consumer: MiddlewareConsumer) {}
}
