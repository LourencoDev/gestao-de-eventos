import { EventoInterface } from './../interfaces/eventoInterface';
import { model, Schema } from "mongoose";

interface EventoModel extends EventoInterface{};

const EventoSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    data: {
        type: String,
        required: true
    },
    hora: {
        type: String,
        required: true
    },
    organizadorId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Organizador"
    },
    createdAt: {
        type: Schema.Types.Date,
        default: Date.now()
    }
});

export default model<EventoModel>("Evento", EventoSchema);