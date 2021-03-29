import { Request, Response } from "express";
import Organizador from "../model/Organizador";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

class OrganizadorController{
    public async cadastrar(req: Request, res: Response): Promise<Response> {
        const { instituicao, email, senha, confirmacaoSenha } = req.body;
        
        if(senha == confirmacaoSenha){
            await Organizador.findOne({ 
                email: email
            }).then(async (organizador) => {
                if(organizador)
                    return res.status(500).json({ mensagem: "Já existe um Organizador cadastrado com esse email!" });
                
                let organizadorCadastrado = await Organizador.create({
                    instituicao: instituicao,
                    email: email,
                    senha: senha
                });
                
                const response = {
                    _id: organizadorCadastrado._id,
                    instituicao: organizadorCadastrado.instituicao,
                    email: organizadorCadastrado.email,
                }
    
                return res.status(201).json({ response, mensagem: "Cadastro com sucesso!" });                
            }).catch((error) => {
                return res.status(500).json({ error: error });
            });
        }      
        else
            return res.status(500).json({ mensagem: "As senhas não correspondem!" });
    }

    public async login(req: Request, res: Response): Promise<Response> {
        const { email, senha } = req.body;
        
        await Organizador.findOne({ 
            email: email 
        }).then(async (organizador) => {
            if(organizador){
                const resultado = await bcrypt.compare(senha, organizador.senha);
                
                if(resultado){
                    const token = jwt.sign({
                        _id: organizador._id,
                        nome: organizador.instituicao,
                        email: organizador.email
                    }, process.env.JWT_SECRET_KEY_ORGANIZADOR, {
                        expiresIn: "2h"
                    });           
                    return res.status(200).json({ mensagem: "Autenticado com sucesso!", token: token });
                }
                else
                    return res.status(401).json({ mensagem: "Senha incorreta!" });
            }
            else
                return res.status(401).json({ mensagem: "Não existe nenhum Organizador cadastrado com esse email!" });
        }).catch((error) => {
            return res.status(500).json({ error: error });
        });
        return res.status(401).json({ });
    } 
}

export default new OrganizadorController();