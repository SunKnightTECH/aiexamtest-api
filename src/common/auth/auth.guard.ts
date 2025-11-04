//   /src/common/guards/auth.guard.ts
import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
    constructor(
        private reflector: Reflector,
        private JwtService: JwtService,
    ) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride("isPublic", [context.getHandler(), context.getClass()]);
        if (isPublic) {
            const request = context.switchToHttp().getRequest();
            const authorization = request.headers.authorization || void 0;
            if (authorization) {
                const token = authorization.split(" ")[1]; // authorization: Bearer xxx
                const payload: any = this.JwtService.decode(token);
                if (payload != null && payload != "null") {
                    request.user = payload;
                }
            }
            return true;
        }
        return super.canActivate(context);
    }
}
