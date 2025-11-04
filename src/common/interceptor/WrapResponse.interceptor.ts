import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Request, Response } from "express";
import { Observable } from "rxjs";
@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest<Request>();
        const res = context.switchToHttp().getResponse<Response>();
        //if (req.method === 'POST') {
        //    if (res.statusCode === 201)
        //        context.switchToHttp().getResponse().status(HttpStatus.OK);
        //}
        return next.handle();
        //return next.handle().pipe(tap(data => {
        //    if (!data) {
        //        throw new BadRequestException('接口未访问到资源或程序未响应')
        //    }
        //}));
        // return next.handle().pipe(map((data) => { return lowerCaseKeys(data) }));
    }
}
