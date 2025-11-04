import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Customer, CustomerSchema } from "../../schema/customer.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Customer.name, schema: CustomerSchema },
        ]),
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule { }
