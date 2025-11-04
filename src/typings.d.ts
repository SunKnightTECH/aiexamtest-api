import * as express from "express";
declare module "*.json" {
    const value: any;
    export default value;
}

declare global {
    namespace Express {
        interface Request {
            user?: Record<string, any>;
        }
    }
}
