import { Request, Response } from "express"
import { Citi, Crud } from "../global"
import { request } from "http";

class MatchController implements Crud {
    constructor(private readonly citi = new Citi("Match")) {}
    create = async (request:Request, response:Response) => {
        const { name, date, time, platform, link, description, ownerId, isFull, isActive, maxPlayers } = request.body
        
        const isAnyUndefined = this.citi.areValuesUndefined(
            name,
            date,
            time,
            platform,
            link,
            description,
            ownerId,
            isFull,
            isActive,
            maxPlayers
        );
        if (isAnyUndefined) return response.status(400).send();
        
        const newMatch = { name, date, time, platform, link, description, ownerId, isFull, isActive, maxPlayers }
        const {httpStatus, message, values} = await this.citi.insertIntoDatabase(newMatch);

        return response.status(httpStatus).send({message, values});
    };

    get = async (request:Request, response: Response) => {
        const { httpStatus, values } = await this.citi.getAllMatches();

        return response.status(httpStatus).send(values)
    };

    getById = async (request:Request, response: Response) => {
        const { id } = request.params;
        const { httpStatus, value } = await this.citi.findMatchById(id);
        return response.status(httpStatus).send(value);
    };

    update = async (request:Request, response: Response) => {
        const { id } = request.params;
        const { name,date,time,platform,link,description, ownerId,isFull,isActive,maxPlayers } = request.body;

        const updatedValues = { name,date,time,platform,link,description, ownerId,isFull,isActive,maxPlayers };

        const { httpStatus, messageFromUpdate } = await this.citi.updateValue(id, updatedValues);

        return response.status(httpStatus).send({messageFromUpdate});
    };

    addPlayer = async (request:Request, response: Response) => {
        const { id } = request.params;
        const { playerId } = request.body;
        
        const { httpStatus, messageFromUpdate } = await this.citi.addPlayer(id, playerId);

        return response.status(httpStatus).send({messageFromUpdate});
    };

    removePlayer = async (request:Request, response: Response) => {
        const { id } = request.params;
        const { playerId } = request.body;
        
        const { httpStatus, messageFromUpdate } = await this.citi.removePlayer(id, playerId);

        return response.status(httpStatus).send({messageFromUpdate});
    }

    delete = async (request: Request, response: Response) => {
        const { id } = request.params;
    
        const { httpStatus, messageFromDelete } = await this.citi.deleteValue(id);
    
        return response.status(httpStatus).send({ messageFromDelete });
    };
}

export default new MatchController();
