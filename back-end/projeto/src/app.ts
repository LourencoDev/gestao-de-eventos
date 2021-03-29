import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import organizadorRoutes from "./routes/organizadorRoutes";
import pessoaRoutes from "./routes/pessoaRoutes";
import eventoRoutes from "./routes/eventoRoutes";
import inscricaoRoutes from "./routes/inscricaoRoutes";


export class App{
    private express: express.Application;
    
    constructor(){
        this.express = express();
        this.database();
        this.middleware();
        this.routes();
        this.listen();
    }

    public getApp() : express.Application {
        return this.express;
    }

    private database() : void {
        mongoose.connect("mongodb://localhost/gestao-de-eventos", {
            useUnifiedTopology: true,
            useNewUrlParser: true
        }).then(() => {
            console.log("Conexão com o Banco de Dados estabelecida com sucesso!");
        }).catch((error) => {
            console.log("Erro ao tentar se conectar ao Banco de Dados: " + error);
        });
    }

    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(cors());
    }

    private routes() : void {
        this.express.use("/organizadores", organizadorRoutes);
        this.express.use("/pessoas", pessoaRoutes);
        this.express.use("/eventos", eventoRoutes);
        this.express.use("/inscricoes", inscricaoRoutes);
    }

    private listen() : void {
        this.express.listen(3000, () => {
            console.log("Servidor rodando na porta 3000...");
        });
    }
}

function cors(): import("express-serve-static-core").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>> {
    throw new Error("Function not implemented.");
}