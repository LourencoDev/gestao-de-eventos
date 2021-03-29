import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import Organizador from "./../model/Organizador";
import Pessoa from "./../model/Pessoa";
import { OrganizadorInterface } from "../interfaces/organizadorInterface";
import { PessoaInterface } from "../interfaces/pessoaInterface";

dotenv.config();

class Autenticacao{
    public async autorizarOrganizadorByToken(req: Request, res: Response, next: NextFunction){
        try{
            const token = req.headers.authorization.split(" ")[1];
            
            if(!token)
                return res.status(401).json({ mensagem: "Acesso não autorizado!" }); // Token não informado

            const organizadorToken = jwt.verify(token, process.env.JWT_SECRET_KEY_ORGANIZADOR) as OrganizadorInterface;
            const organizador = await Organizador.findById(organizadorToken._id);
    
            if(!organizador)
                return res.status(401).send({ mensagem: "Acesso não autorizado!" }); // Pessoa não cadastrada
            
            req.organizador = organizador; 
            return next();
        }
        catch(error){
            return res.status(401).send({ mensagem: "Acesso não autorizado!" }); // Token inválido
        }  
    }
    public async autorizarPessoaByToken(req: Request, res: Response, next: NextFunction){
        try{
            const token = req.headers.authorization.split(" ")[1];
            
            if(!token)
                return res.status(401).json({ mensagem: "Acesso não autorizado!" }); // Token não informado

            const pessoaToken = jwt.verify(token, process.env.JWT_SECRET_KEY_PESSOA) as PessoaInterface;
            const pessoa = await Pessoa.findById(pessoaToken._id);
    
            if(!pessoa)
                return res.status(401).send({ mensagem: "Acesso não autorizado!" }); // Pessoa não cadastrada
            
            req.pessoa = pessoa;
            return next();
        }
        catch(error){
            return res.status(401).send({ mensagem: "Acesso não autorizado!" }); // Token inválido
        }  
    }
}

export default new Autenticacao();