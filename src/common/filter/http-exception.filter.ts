import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    constructor() {}
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp(); // 获取请求上下文
        const res = ctx.getResponse(); // 获取请求上下文中的 response对象
        const status = exception.getStatus(); // 获取异常状态码

        const exceptionResponse: any = exception.getResponse();

        let errorResponse;
        if (typeof exceptionResponse == "string") {
            errorResponse = {
                statusCode: null,
                error: null,
                message: exceptionResponse,
                code: status,
            };
        } else {
            errorResponse = {
                statusCode: status, //exceptionResponse.error,
                error: exceptionResponse.error,
                message: exceptionResponse.message,
                code: status,
            };
        }
        if (status == 403) {
            errorResponse.message = "无权限访问";
        }
        //this.logmanageinfoService.create({ objectType: objectTypeEnum.sysError, logContent: JSON.stringify(errorResponse), creator: null, realName: null })
        // 设置返回的状态码， 请求头，发送错误信息
        res.status(status);
        res.send(errorResponse);
    }
}
