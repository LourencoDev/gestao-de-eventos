import { Document, Schema } from "mongoose";

export interface OrganizadorInterface extends Document{
    _id?: any | string,
    instituicao?: string,
    email?: string,
    senha?: string
    createdAt?: Schema.Types.Date
}