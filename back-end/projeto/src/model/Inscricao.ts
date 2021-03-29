import { InscricaoInterface } from './../interfaces/inscricaoInterface';
import { model, Schema } from "mongoose";

interface InscricaoModel extends InscricaoInterface{};

const InscricaoSchema = new Schema({
    eventoId: {
        type: String,
        required: true,
        ref: "Evento"
    },
    pessoaId: {
        type: String, 
        required: true,
        ref: "Pessoa"
    },
    createdAt: {
        type: Schema.Types.Date,
        default: Date.now()
    }
});

export default model<InscricaoModel>("Inscricao", InscricaoSchema);