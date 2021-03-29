import { Document, Schema } from "mongoose";

export interface InscricaoInterface extends Document{
    eventoId: any | String,
    pessoaId: any | String,
    createdAt: Schema.Types.Date
}