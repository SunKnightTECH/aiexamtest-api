import { NestExpressApplication } from "@nestjs/platform-express";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger, ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import { HttpExceptionFilter } from "./common/filter/http-exception.filter";
import { WrapResponseInterceptor } from "./common/interceptor/WrapResponse.interceptor";
import { json, urlencoded } from "express";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            // whitelist: true,
            // forbidNonWhitelisted: false
        }),
    );
    // 增加 JSON 请求体大小限制（默认约100kb）
    app.use(json({ limit: "50mb" }));
    // 增加 URL-encoded 请求体大小限制
    app.use(urlencoded({ extended: true, limit: "50mb" }));
    app.useGlobalFilters(new HttpExceptionFilter());
    const configService = app.get(ConfigService);
    //咱们自己的项目
    //app.setGlobalPrefix(configService.get('apiBaseUrl'));
    // 设置swagger文档
    if (configService.get<boolean>("enableSwagger")) {
        const config = new DocumentBuilder()
            .setTitle("后端服务接口")
            .setDescription("后端服务接口文档")
            .setVersion("1.0")
            .addBearerAuth()
            //.addServer(process.env.BUILD_ENV != 'dev' ? '/api' : '', 'MiniApi_v1.0.1.0') //发布的时候需要加上
            .build();
        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup("/", app, document);
    }
    // 处理跨域
    app.enableCors();
    app.useGlobalInterceptors(new WrapResponseInterceptor());

    await app.listen(configService.get("port"), () => {
        Logger.log(`服务已启动，访问地址:http://localhost:${configService.get("port")}`);
    });
}
bootstrap();
