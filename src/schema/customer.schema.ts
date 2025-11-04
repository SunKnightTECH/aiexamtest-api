import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
export type CustomerDocument = Customer & Document;
@Schema({ collection: "Customer" })
export class Customer {
    @Prop({ required: true, unique: true })
    id: string;
    @Prop()
    ip: string;
    @Prop()
    websiteId: string;
    @Prop()
    createTime: Date;
    @Prop()
    isDeleted: boolean;
    @Prop()
    shareId: string;
}
export const CustomerSchema = SchemaFactory.createForClass(Customer);
