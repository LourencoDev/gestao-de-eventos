import { Request, Response } from "express";
import Pessoa from "../model/Pessoa";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class PessoaController{
    public async cadastrar(req: Request, res: Response): Promise<Response> {
        const { nome, email, senha, confirmacaoSenha } = req.body;
        
        if (senha == confirmacaoSenha){
            await Pessoa.findOne({ email }).then(async (pessoa) => {
                if (pessoa)
                    return res.status(500).json({ mensagem: "Já existe uma Pessoa cadastrada com esse email!" });
                
                const pessoaCadastrada = await Pessoa.create({ nome, email, senha });
                
                const response = {
                    _id: pessoaCadastrada._id,
                    nome: pessoaCadastrada.nome,
                    email: pessoaCadastrada.email,
                }
    
                return res.status(201).json({ response });                
            }).catch((error) => {
                return res.status(500).json({ error: error });
            });
        }      
        else
            return res.status(500).json({ mensagem: "As senhas não correspondem!" });
    }

    public async login(req: Request, res: Response): Promise<Response> {
        const { email, senha } = req.body;
        
        await Pessoa.findOne({ email }).then(async (pessoa) => {
            if (pessoa){
                const resultado = await bcrypt.compare(senha, pessoa.senha);
                
                if (resultado) {
                    const token = jwt.sign({
                        _id: pessoa._id,
                        nome: pessoa.nome,
                        email: pessoa.email
                    }, process.env.JWT_SECRET_KEY_PESSOA, {
                        expiresIn: "2h"
                    });
                    return res.status(200).json({ mensagem: "Autenticado com sucesso!", token: token });
                }
                else
                    return res.status(401).json({ mensagem: "Senha incorreta!" });
            }
            else
                return res.status(401).json({ mensagem: "Não existe nenhuma Pessoa cadastrada com esse email!" });
        }).catch((error) => {
            return res.status(500).json({ error });
        });
        return res.status(401).json({ });
    } 
}

export default new PessoaController();
