import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { JwtService } from "@nestjs/jwt";
import * as url from "url";
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(private readonly jwtService: JwtService) {}
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const now = Date.now();
        const requrl = context.getArgByIndex(0).url;
        const method = context.getArgs()[0].method;
        return next.handle().pipe(
            tap(() => {
                const statuscode = context.getArgByIndex(0).res.statusCode;
                //日志入库
                const logContent = JSON.stringify({
                    method: method,
                    url: requrl,
                    reqOrRes: 1,
                    timeLength: Date.now() - now,
                    statuscode,
                });
                //this.logmanageinfoService.create({ objectType: objectTypeEnum.userReq, logContent: logContent, creator: userId, realName: realName })
            }),
        );
    }
}
