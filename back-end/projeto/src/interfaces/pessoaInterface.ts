import { Document, Schema } from "mongoose";

export interface PessoaInterface extends Document{
    _id?: any | string,
    nome?: string,
    email?: string,
    senha?: string,
    createdAt: Schema.Types.Date
}