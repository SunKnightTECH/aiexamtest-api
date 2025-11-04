import { Strategy, ExtractJwt } from "passport-jwt";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";
import { isEmptyObj } from "../utils/tools";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly config: ConfigService) {
        const jwtConfig = config.get("jwtconfig");
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //使用ExtractJwt.fromHeader从header获取token
            ignoreExpiration: false, //如果为true，则不验证令牌的过期时间。
            secretOrKey: jwtConfig.secret, //使用密钥解析，可以使用process.env.xxx
            passReqToCallback: true,
        });
    }
    // Passport会自动verify jwt，如果key不正确，或是相关信息

    async validate(req: Request, payload) {
        const token = ExtractJwt.fromHeader("authorization")(req);
        if (isEmptyObj(token)) {
            return false;
        }
        return payload;
    }
}
