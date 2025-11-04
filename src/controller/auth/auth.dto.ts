import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { PageDto } from "../common/common.dto";

export interface publickeyauth {
    identificationCode: string;
    publicDer: string;
    privateDer: string;
}

export class LoginInputDto {
    @ApiProperty({ description: "用户名" })
    @IsNotEmpty({ message: "用户名不能为空" })
    userName: string;
    @ApiProperty({ description: "密码" })
    @IsNotEmpty({ message: "密码不能为空" })
    password: string;
    @ApiProperty({ description: "唯一码" })
    @IsNotEmpty({ message: "唯一码不能为空" })
    identificationCode: string;
}

export class SetPwdInputDto {
    @ApiProperty({ description: "密码" })
    @IsNotEmpty({ message: "密码不能为空" })
    password: string;
    @ApiProperty({ description: "唯一码" })
    @IsNotEmpty({ message: "唯一码不能为空" })
    identificationCode: string;
}

export class AdminOutDto {
    @Expose()
    id: string;
    @Expose()
    realName: string;
}

export class GetAdminListInputDto extends PageDto {
    @ApiPropertyOptional({ description: "姓名" })
    @IsOptional()
    @IsString()
    realName: string;
}

export class AddAdminInputDto {
    @ApiProperty({ description: "用户名" })
    @IsNotEmpty({ message: "用户名不能为空" })
    userName: string;
    @ApiProperty({ description: "姓名" })
    @IsNotEmpty({ message: "姓名不能为空" })
    realName: string;
    @ApiPropertyOptional({ description: "栏目" })
    @IsOptional()
    menuList: Array<string>;
}

export class EditAdminInputDto {
    @ApiProperty({ description: "姓名" })
    @IsNotEmpty({ message: "姓名不能为空" })
    realName: string;
    @ApiPropertyOptional({ description: "栏目" })
    @IsOptional()
    menuList: Array<string>;
}

export enum adminLogEventEnum {
    login,
    logout,
}
