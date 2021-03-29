import { Request, Response } from "express";
import Evento from "../model/Evento";
import Inscricao from "../model/Inscricao";

class InscricaoController{
    // public async listarEventosInscritos(req: Request, res: Response): Promise<Response>{
    //     const inscricoes = await Inscricao.find({
    //         pessoaId: req.pessoa.id
    //     }).then(resultados => {
    //         return resultados;
    //     });

    //     let eventos = [];
    //     await inscricoes.forEach(async inscricao => {
    //         const evento = await Evento.findById(inscricao.eventoId).exec();
    //         eventos.push(evento);
    //     });

    //     if(!eventos)
    //         return res.status(200).json({ messagem: "Você não se inscreveu em nenhum evento!" });

    //     return res.status(200).json({ eventos: eventos });
    // }

    public async inscrever(req: Request, res: Response): Promise<Response>{
        const eventoId = req.params.id;
        
        const inscricao = await Inscricao.findOne({
            pessoaId: req.pessoa.id,
            eventoId: eventoId
        }).then(resultado => {
            return resultado;
        });

        if(inscricao)
           return res.status(409).json({ mensagem: "Você já se inscreveu nesse evento!" });
        
        await Inscricao.create({
            pessoaId: req.pessoa.id,
            eventoId: eventoId
        });

        return res.status(201).json({ mensagem: "Você se inscreveu no evento com sucesso!" });
    }
}

export default new InscricaoController();