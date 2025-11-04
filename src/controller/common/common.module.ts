import { Module } from "@nestjs/common";
import { CommonController } from "./common.controller";
import { CommonService } from "./common.service";
import { Questionnaire } from "schema/questionnaire.schema";
import { QuestionnaireSchema } from "schema/questionnaire.schema";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Questionnaire.name,
                schema: QuestionnaireSchema,
            },
        ]),
    ],
    controllers: [CommonController],
    providers: [CommonService],
})
export class CommonModule { }
