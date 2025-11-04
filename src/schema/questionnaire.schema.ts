import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
export type QuestionnaireDocument = Questionnaire & Document;
@Schema({ collection: "Questionnaire" })
export class Questionnaire {
    @Prop({ required: true, unique: true })
    id: string;

    @Prop()
    customerId: string;

    @Prop()
    title: string;

    @Prop()
    content: string;

    @Prop()
    type: string;

    @Prop()
    createTime: Date;

    @Prop({
        type: mongoose.Schema.Types.Mixed,
    })
    analysis: any;
}
export const QuestionnaireSchema = SchemaFactory.createForClass(Questionnaire);