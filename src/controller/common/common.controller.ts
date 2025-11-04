import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CommonService } from "./common.service";
import { Public } from "../../common/auth/public.decorator";
import { AnalysisDto } from "./common.dto";

@ApiBearerAuth()
@ApiTags("公共设置")
@Controller("common")
export class CommonController {
    constructor(private readonly CommonService: CommonService) { }

    @ApiOperation({ summary: "分析问卷" })
    @Post("analysis")
    @Public()
    async analysis(@Body() body: AnalysisDto) {
        return this.CommonService.analysis(body);
    }

    @ApiOperation({ summary: "获取问卷" })
    @Get("getQuestionnaire/:id")
    @Public()
    async getQuestionnaire(@Param("id") id: string) {
        return this.CommonService.getQuestionnaire(id);
    }
}
