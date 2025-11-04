import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Customer, CustomerDocument } from "../../schema/customer.schema";

@Injectable()
export class AuthService {
    constructor(
        private readonly JwtService: JwtService,
        @InjectModel(Customer.name) private Customer: Model<CustomerDocument>,
    ) {
    }
    async getCommonToken(ip: string, shareId: string) {

    }
}
