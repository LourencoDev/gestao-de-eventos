import { PessoaInterface } from './../interfaces/pessoaInterface';
import { model, Schema } from "mongoose"
import bcrypt from 'bcrypt';

interface PessoaModel extends PessoaInterface{};

const PessoaSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    createdAt: {
        type: Schema.Types.Date,
        default: Date.now()
    }
});

PessoaSchema.pre<PessoaModel>("save", async function criptografarSenha(){
    this.senha = await bcrypt.hash(this.senha, 10);
});

export default model<PessoaModel>("Pessoa", PessoaSchema);