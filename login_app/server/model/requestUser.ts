import { Request } from "express";

export default interface RequestUser extends Request {
    user?:{
        userId:string,
        username:string
    }|unknown
    query: any;
}