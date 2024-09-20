import { Request, Response } from "express";
import { Citi, Crud } from "../global";

class UserController implements Crud {
  constructor(private readonly citi = new Citi("User")) {}
  create = async (request: Request, response: Response) => {
    const { username, email } = request.body;

    const isAnyUndefined = this.citi.areValuesUndefined(
      username,
      email
    );
    if (isAnyUndefined) return response.status(400).send();

    const newUser = { username, email };
    const { httpStatus, message, values } = await this.citi.insertUser(newUser);

    return response.status(httpStatus).send({ message, values });
  };

  get = async (request: Request, response: Response) => {
    const { httpStatus, values } = await this.citi.getAllUser();

    return response.status(httpStatus).send(values);
  };

  getByUsername = async(request: Request, response: Response) =>{
    const { username } = request.params;

    const { httpStatus, value} = await this.citi.findByUsername(username);

    return response.status(httpStatus).send(value);

  }

  delete = async (request: Request, response: Response) => {
    const { id } = request.params;

    const { httpStatus, messageFromDelete } = await this.citi.deleteValue(id);

    return response.status(httpStatus).send({ messageFromDelete });
  };

  update = async (request: Request, response: Response) => {
    const { id } = request.params;
    const { username, email } = request.body;

    const updatedValues = { username, email };

    const { httpStatus, messageFromUpdate } = await this.citi.updateValue(
      id,
      updatedValues
    );

    return response.status(httpStatus).send({ messageFromUpdate });
  };
}

export default new UserController();
