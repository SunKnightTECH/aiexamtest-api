import { BadRequestException, Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Patch, Post, Query, Req } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";

@ApiBearerAuth()
@ApiTags("权限中心")
@Controller("auth")
export class AuthController {
    constructor(
        private readonly AuthService: AuthService,
    ) { }

}
