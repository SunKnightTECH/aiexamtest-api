import { BadRequestException, Injectable } from "@nestjs/common";
import { AnalysisDto } from "./common.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Questionnaire } from "schema/questionnaire.schema";
import { Model } from "mongoose";
import { QuestionnaireDocument } from "schema/questionnaire.schema";
import { createUUID } from "common/utils/tools";
import { join } from "path";
import { readFileSync } from "fs";
import openai from "openai";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class CommonService {
    constructor(@InjectModel(Questionnaire.name) private questionnaireModel: Model<QuestionnaireDocument>,
        private configService: ConfigService) {
    }
    publicPath = join(__dirname, 'src', '../../../public');
    async analysis(body: AnalysisDto) {
        const entity: Questionnaire = {
            title: body.title,
            content: body.content,
            type: body.type,
            id: createUUID(),
            customerId: "",
            createTime: new Date(),
            analysis: null
        };
        const questionnaire = await new this.questionnaireModel(entity).save();
        const promptPath = join(this.publicPath, 'prompt.txt');
        const promptContent = readFileSync(promptPath, 'utf-8');
        const openaiClient = new openai({
            apiKey: this.configService.get('openaiConfig').apiKey,
            baseURL: this.configService.get('openaiConfig').baseURL,
        });

        const userPrompt = `
        ### 问卷标题
        ${body.title}
        ### 问卷内容
        ${body.content}
        ### 问卷类型
        ${body.type}
        `
        const completion = await openaiClient.chat.completions.create({
            model: this.configService.get('openaiConfig').model,
            messages: [
                { role: "system", content: promptContent },
                { role: "user", content: userPrompt },
            ],
            response_format: { type: "json_object" },
        });

        const analysis = JSON.parse(completion.choices[0].message.content);
        questionnaire.analysis = analysis;
        await this.questionnaireModel.updateOne({
            id: entity.id,
        }, {
            analysis: questionnaire.analysis,
        })
        return questionnaire;
    }
    async getQuestionnaire(id: string) {
        const questionnaire = await this.questionnaireModel.findOne({ id });
        if (!questionnaire) {
            throw new BadRequestException("问卷不存在");
        }
        return questionnaire;
    }
}
