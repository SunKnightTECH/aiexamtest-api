import { SetMetadata } from "@nestjs/common";
import { roleEnum } from "./roles.dto"; // 引入角色枚举
export const Roles = (...roles: roleEnum[]) => SetMetadata("roles", roles);
