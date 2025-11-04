import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { roleEnum } from "./roles.dto"; // 引入角色枚举

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly JwtService: JwtService,
    ) {}
    canActivate(context: ExecutionContext): boolean {
        const isPublic = this.reflector.getAllAndOverride("isPublic", [context.getHandler(), context.getClass()]);
        if (isPublic) return true;
        const roles = this.reflector.get<roleEnum[]>("roles", context.getHandler());
        if (!roles) return true; // 没有角色要求的装饰器，允许访问
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(" ")[1]; // 假设 token 存在于 Authorization 头部中
        if (!token) {
            return false;
        }
        try {
            const decodedToken = this.JwtService.decode(token);
            const userRole: roleEnum = decodedToken.role; // 假设角色信息存储在 token 的 role 字段中
            // 验证用户角色是否符合要求
            return roles.some((role) => role === userRole);
        } catch (error) {
            return false;
        }
    }
}
