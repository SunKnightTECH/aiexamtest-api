import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { isEmptyObj, isIntNum } from "../../common/utils/tools";

export enum sortByEnum {
    ASC,
    DESC,
}

export const sortByStr = new Map([
    [sortByEnum.ASC, "ASC"],
    [sortByEnum.DESC, "DESC"],
]);

export class SortByField {
    @ApiPropertyOptional({ description: "排序字段" })
    @IsOptional()
    @Transform(({ value }) => {
        return isEmptyObj(value) ? null : value;
    })
    @IsString()
    sortField: string;
    @ApiPropertyOptional({ description: "排序" })
    @IsOptional()
    @Type(() => Number)
    @Transform(({ value }) => {
        return value == undefined ? null : parseInt(value);
    })
    sortBy: sortByEnum;
}

export class PageDto extends SortByField {
    @ApiPropertyOptional({ description: "页码" })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Transform(({ value }) => {
        return isIntNum(value) ? (parseInt(value) ? parseInt(value) : 1) : 1;
    })
    pageIndex: number = 1;

    @ApiPropertyOptional({ description: "每页现实数量" })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Transform(({ value }) => {
        return isIntNum(value) ? parseInt(value) : 20;
    })
    pageCount: number = 20;
}


export class AnalysisDto {

    @ApiProperty({ description: "标题" })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({ description: "内容" })
    @IsNotEmpty()
    @IsString()
    content: string;

    @ApiProperty({ description: "类型" })
    @IsNotEmpty()
    @IsString()
    type: string;
}
