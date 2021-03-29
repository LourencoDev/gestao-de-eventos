import Evento from "../model/Evento";
import { Request, Response } from "express";

class EventoController{
    public async criar(req: Request, res: Response): Promise<Response> {
        const { nome, data, hora } = req.body;
        
        const eventoCriado = await Evento.create({
            nome: nome,
            data: data,
            hora: hora,
            organizadorId: req.organizador._id
        });

        return res.status(201).json({ messagem: "Evento criado com sucesso!" });
    }
    
    public async remover(req: Request, res: Response): Promise<Response> {
        try{
            const id = req.params.id;
            const evento = await Evento.findByIdAndDelete(id).exec();
            return res.status(200).json({ messagem: "Evento removido com sucesso!" });
        }
        catch(error){
            return res.status(404).json({ messagem: "Nenhum evento foi encontrado!" });
        }
    }

    public async listar(req: Request, res: Response): Promise<Response> {
        const eventos = await Evento.find().then((resultados) => {
            return resultados;
        });
        return res.status(200).json({ eventos: eventos });
    }

    public async listarPorOrganizador (req: Request, res: Response): Promise<Response> {
        const eventos = await Evento.find({ 
            organizadorId: req.organizador.id
        }).then((resultados) => {
            return resultados;
        });

        return res.status(200).json({ eventos: eventos });
    }

    public async buscarPorId (req: Request, res: Response): Promise<Response> {
        const id = req.params.id;
        
        try{
            const evento = await Evento.findById(id).then((resultado) => {
                return resultado;
            });

            return res.status(200).json({ evento: evento });
        }
        catch(error){
            return res.status(404).json({ mensagem: "Evento não encontrado!" });
        }
    }
}

export default new EventoController();