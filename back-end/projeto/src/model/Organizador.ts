import { model, Schema } from "mongoose";
import { OrganizadorInterface } from "../interfaces/organizadorInterface";
import bcrypt from "bcrypt";

interface OrganizadorModel extends OrganizadorInterface{};

const OrganizadorSchema = new Schema({
    instituicao: {
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

OrganizadorSchema.pre<OrganizadorModel>("save", async function criptografarSenha(){
    this.senha = await bcrypt.hash(this.senha, 10);
});

export default model<OrganizadorModel>("Organizador", OrganizadorSchema);