import { Document, Schema } from 'mongoose';

export interface EventoInterface extends Document{
    _id?: any | string,
    nome?: string,
    data?: string,
    hora?: string,
    organizadorId?: any | string,
    createdAt?: Schema.Types.Date
}