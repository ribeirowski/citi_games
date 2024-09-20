import Message from "./Message";
import Terminal from "./Terminal";
import {
  InsertableDatabase,
  GetableDatabase,
  RemoveableDatabase,
  UpdatableDatabaseValue,
  FindableDatabaseValue,
  InsertableDatabaseUser,
} from "./types";
import { Match, PrismaClient, User, type Prisma } from "@prisma/client";
import prisma from "@database";
import { disconnect } from "process";

type ModelNames = Prisma.ModelName;

type Models = {
  [M in ModelNames]: Exclude<
    Awaited<ReturnType<PrismaClient[Uncapitalize<M>]["findFirst"]>>,
    null
  >;
};

type ModelCreateInput = {
  [M in ModelNames]: Parameters<
    PrismaClient[Uncapitalize<M>]["create"]
  >[0]["data"];
};

type ModelUpdateInput = {
  [M in ModelNames]: Parameters<
    PrismaClient[Uncapitalize<M>]["update"]
  >[0]["data"];
};

/**
 * Classe que representa um conjunto de operações de banco de dados que podem ser realizadas em uma entidade.
 */
export default class Citi<Entity extends ModelNames> {
  constructor(readonly entity: Entity) {}
  /**
   * Verifica se algum dos elementos fornecidos está indefinido.
   *
   * @param {...string[]} elements - Elementos a serem verificados.
   * @returns {boolean} Retorna verdadeiro se algum dos elementos estiver indefinido, caso contrário, retorna falso.
   */
  areValuesUndefined(...elements: string[]): boolean {
    const isAnyUndefined = elements.some((element) => {
      return element === undefined;
    });
    return isAnyUndefined;
  }

  /**
   * @description Insere um objeto no banco de dados.
   * Não sabe o que inserir? Teste chamando a função com
   * insertIntoDatabase({}) e
   * clicando em ctrl+espaço dentro do objeto no parâmetro!
   * @param {ModelCreateInput[Entity]} object O dado a ser inserido.
   * @returns {InsertableDatabase} O httpStatus e uma message.
   * @example
   * const citi = new Citi("User")
   * await citi.insertIntoDatabase({firstName: "Mário", lastName: "Mota", age: 20})
   */
  async insertIntoDatabase<T extends ModelCreateInput[Entity]>(
    object: T
  ): Promise<InsertableDatabase<Models[Entity]>> {
    try {
      const values = await prisma[
        this.entity.toLowerCase() as Uncapitalize<Prisma.ModelName>
        //@ts-expect-error
      ].create({
        data: object,
      });
      Terminal.show(Message.INSERTED_IN_DATABASE);
      return {
        httpStatus: 201,
        message: Message.INSERTED_IN_DATABASE,
        values
      };
    } catch (error) {
      Terminal.show(Message.ERROR_INSERTING_DATABASE);
      return {
        httpStatus: 400,
        message: Message.ERROR_INSERTING_DATABASE,
        values: undefined
      };
    }
  }

  async insertUser<T extends ModelCreateInput[Entity]>(
    object: T
  ): Promise<InsertableDatabaseUser<Models[Entity]>> {
    try {
      const values = await prisma[
        this.entity.toLowerCase() as Uncapitalize<Prisma.ModelName>
        //@ts-expect-error
      ].create({
        data: object,
      });
      Terminal.show(Message.INSERTED_IN_DATABASE);
      return {
        httpStatus: 201,
        message: Message.INSERTED_IN_DATABASE,
        values
      };
    } catch (error) {
      Terminal.show(Message.LOGIN_ALREADY_EXIST);
      return {
        httpStatus: 400,
        message: Message.LOGIN_ALREADY_EXIST,
        values: undefined
      };
    }
  }

  /**
   * Obtém todos os registros da entidade do banco de dados.
   *
   * @returns {Promise<GetableDatabase<Models[Entity]>>} Uma promessa que resolve para um objeto contendo o status HTTP e os valores recuperados.
   */
  async getAll(): Promise<GetableDatabase<Models[Entity]>> {
    try {
      const values = await prisma[
        this.entity.toLowerCase() as Uncapitalize<Prisma.ModelName>
        //@ts-expect-error
      ].findMany<Models[Entity]>();
      Terminal.show(Message.GET_ALL_VALUES_FROM_DATABASE);
      return {
        httpStatus: 200,
        values,
      };
    } catch (error) {
      Terminal.show(Message.ERROR_GETTING_VALUES_FROM_DATABASE);
      return {
        httpStatus: 400,
        values: [],
      };
    }
  }

  async getAllUser(): Promise<GetableDatabase<Models['User']>> {
    try {
      const values = await prisma[
        'user'
        //@ts-expect-error
      ].findMany<Models['User']>({
        include: {
          matches: true,
          isOwner: true
        }
      });
      Terminal.show(Message.GET_ALL_VALUES_FROM_DATABASE);
      return {
        httpStatus: 200,
        values,
      };
    } catch (error) {
      Terminal.show(Message.ERROR_GETTING_VALUES_FROM_DATABASE);
      return {
        httpStatus: 400,
        values: [],
      };
    }
  }

  async getAllMatches(): Promise<GetableDatabase<Models["Match"]>> {
    try {
      const values = await prisma[
        "match"
        //@ts-expect-error
      ].findMany<Models["Match"]>({
        include: {
          owner: true,
          players: true,
        },
      });

      Terminal.show(Message.GET_ALL_VALUES_FROM_DATABASE);
      return {
        httpStatus: 200,
        values,
      };
    } catch (error) {
      Terminal.show(Message.ERROR_GETTING_VALUES_FROM_DATABASE);
      return {
        httpStatus: 400,
        values: [],
      };
    }
  }

  /**
   * Procura um registro por ID na entidade do banco de dados.
   *
   * @param {string | number} id - O ID do registro a ser encontrado.
   * @returns {Promise<FindableDatabaseValue<Models[Entity]>>} Uma promessa que resolve para um objeto contendo o status HTTP e o valor encontrado, se existir.
   */
  async findById(
    id: string | number
  ): Promise<FindableDatabaseValue<Models[Entity]>> {
    try {
      const value = await prisma[
        this.entity.toLowerCase() as Uncapitalize<Prisma.ModelName>
        //@ts-expect-error
      ].findFirst({
        where: {
          id: id,
        },

      });
      Terminal.show(Message.VALUE_WAS_FOUND);
      return {
        httpStatus: 200,
        value,
      };
    } catch (error) {
      Terminal.show(Message.VALUE_WAS_NOT_FOUND);
      return {
        httpStatus: 400,
        value: undefined,
      };
    }
  }

  async findMatchById(
    id: string
  ): Promise<FindableDatabaseValue<Models[Entity]>> {
    try {
      const value = await prisma[
        this.entity.toLowerCase() as Uncapitalize<Prisma.ModelName>
        //@ts-expect-error
      ].findFirst<Models["Match"]>({
        where: {
          id: id,
        },
        include: {
          owner: true,
          players: true,
        },
      });

      Terminal.show(Message.VALUE_WAS_FOUND);
      return {
        httpStatus: 200,
        value,
      };
    } catch (error) {
      Terminal.show(Message.VALUE_WAS_NOT_FOUND);
      return {
        httpStatus: 400,
        value: undefined,
      };
    }
  }

  async findInUser(
    id: string
  ): Promise<FindableDatabaseValue<Models["User"]>> {
    try {
      const value = await prisma[
        // this.entity.toLowerCase() as Uncapitalize<Prisma.ModelName>
        // //@ts-expect-error
        "user"
      ].findFirst({
        where: {
          id
        },
      });
      if(value === null) {
        Terminal.show(Message.VALUE_WAS_NOT_FOUND);
        return {
          httpStatus: 400,
          value: undefined,
        };
      }

      Terminal.show(Message.VALUE_WAS_FOUND);
      return {
        httpStatus: 200,
        value,
      };
    } catch (error) {
      Terminal.show(Message.VALUE_WAS_NOT_FOUND);
      return {
        httpStatus: 400,
        value: undefined,
      };
    }
  }

  async findByUsername(
    username: string 
  ): Promise<FindableDatabaseValue<Models[Entity]>> {
    try {
      const value = await prisma[
        this.entity.toLowerCase() as Uncapitalize<Prisma.ModelName>
        //@ts-expect-error
      ].findFirst({
        where: {
          username: username,
        },
        include: {
          matches: true,
          isOwner: true,
        }
      });
      Terminal.show(Message.VALUE_WAS_FOUND);
      return {
        httpStatus: 200,
        value,
      };
    } catch (error) {
      Terminal.show(Message.VALUE_WAS_NOT_FOUND);
      return {
        httpStatus: 400,
        value: undefined,
      };
    }
  }

  async findUserInMatch(
    id: string ,
    playerId: string
  ): Promise<FindableDatabaseValue<Models["Match"]>> {
    try {
      const value = await prisma[
        this.entity.toLowerCase() as Uncapitalize<Prisma.ModelName>
        //@ts-expect-error
      ].findFirst({
        where: {
          id: id ,
          players: {
            some: {
              id: playerId
            }
          }
        }
      });

      console.log("Query result: ", value);

      Terminal.show(Message.VALUE_WAS_FOUND);
      return {
        httpStatus: 200,
        value,
      };
    } catch (error) {
      console.log(error);
      Terminal.show(Message.VALUE_WAS_NOT_FOUND);
      return {
        httpStatus: 400,
        value: undefined,
      };
    }
  }

  /**
   * Atualiza um registro na entidade do banco de dados com os valores fornecidos.
   *
   * @param {string | number} id - O ID do registro a ser atualizado.
   * @param {T} object - O objeto contendo os valores a serem atualizados.
   * @returns {Promise<UpdatableDatabaseValue>} Uma promessa que resolve para um objeto contendo o status HTTP e uma mensagem indicando o resultado da operação de atualização.
   */
  async updateValue<T extends ModelUpdateInput[Entity]>(
    id: string | number,
    object: T
  ): Promise<UpdatableDatabaseValue> {
    try {
      const valueExists = await this.findById(id);
      if (!valueExists.value)
        return {
          httpStatus: 400,
          messageFromUpdate: Message.VALUE_WAS_NOT_FOUND,
        };

      await prisma[
        this.entity.toLowerCase() as Uncapitalize<Prisma.ModelName>
        //@ts-expect-error
      ].update({
        where: {
          id: id,
        },
        data: object,
      });

      Terminal.show(Message.VALUE_WAS_UPDATED);
      return {
        httpStatus: 200,
        messageFromUpdate: Message.VALUE_WAS_UPDATED,
      };
    } catch (error) {
      Terminal.show(Message.ERROR_AT_UPDATE_FROM_DATABASE);
      return {
        httpStatus: 400,
        messageFromUpdate: Message.ERROR_AT_UPDATE_FROM_DATABASE,
      };
    }
  }

  async addPlayer<T extends ModelUpdateInput[Entity]>(
    id: string,
    playerId: string
  ): Promise<UpdatableDatabaseValue> {
    try {
      const valueExists = await this.findById(id);
      const playerExists = await this.findInUser(playerId);
      if (!valueExists.value || !playerExists.value) {
        return {
          httpStatus: 400,
          messageFromUpdate: Message.VALUE_WAS_NOT_FOUND,
        };
      }
      
      const { httpStatus, value } = await this.findUserInMatch(id, playerId);
      
      if (httpStatus === 200 && value !== null) {
        return {
          httpStatus: 400,
          messageFromUpdate: Message.PLAYER_ALREADY_ADDED,
        }
      }

      await prisma[
        this.entity.toLowerCase() as Uncapitalize<Prisma.ModelName>
        //@ts-expect-error
      ].update({
        where: {
          id: id,
        },
        data: {
          players: {
            connect: {
              id: playerId,
            },
          },
        },
      });

      Terminal.show(Message.PLAYER_ADDED);
      return {
        httpStatus : 200,
        messageFromUpdate: Message.PLAYER_ADDED,
      }
    }
    catch (error) {
      Terminal.show(Message.ERROR_AT_UPDATE_FROM_DATABASE);
      return {
        httpStatus: 400,
        messageFromUpdate: Message.ERROR_AT_UPDATE_FROM_DATABASE,
      };
    }
  }

  async removePlayer<T extends ModelUpdateInput[Entity]>(
    id: string,
    playerId: string
  ): Promise<UpdatableDatabaseValue> {
    try {
      const valueExists = await this.findById(id);
      const playerExists = await this.findInUser(playerId);
      if (!valueExists.value || !playerExists.value) {
        return {
          httpStatus: 400,
          messageFromUpdate: Message.VALUE_WAS_NOT_FOUND,
        };
      }
      
      const { httpStatus, value } = await this.findUserInMatch(id, playerId);
      
      if (httpStatus === 400) {
        return {
          httpStatus: 400,
          messageFromUpdate: Message.PLAYER_NOT_IN_MATCH,
        }
      }

      await prisma[
        this.entity.toLowerCase() as Uncapitalize<Prisma.ModelName>
        //@ts-expect-error
      ].update({
        where: {
          id: id,
        },
        data: {
          players: {
            disconnect: {
              id: playerId,
            },
          },
        },
      });

      Terminal.show(Message.PLAYER_DELETED);
      return {
        httpStatus : 200,
        messageFromUpdate: Message.PLAYER_DELETED,
      }
    }
    catch (error) {
      Terminal.show(Message.ERROR_AT_UPDATE_FROM_DATABASE);
      return {
        httpStatus: 400,
        messageFromUpdate: Message.ERROR_AT_UPDATE_FROM_DATABASE,
      };
    }
  }

  /**
   * Deleta um registro por ID na entidade do banco de dados.
   *
   * @param {string | number} id - O ID do registro a ser deletado.
   * @returns {Promise<RemoveableDatabase>} Uma promessa que resolve para um objeto contendo o status HTTP e uma mensagem indicando o resultado da operação de exclusão.
   */
  async deleteValue(id: string | number): Promise<RemoveableDatabase> {
    try {
      await prisma[
        this.entity.toLowerCase() as Uncapitalize<Prisma.ModelName>
        //@ts-expect-error
      ].delete({
        where: {
          id: id,
        },
      });
      Terminal.show(Message.VALUE_DELETED_FROM_DATABASE);
      return {
        httpStatus: 200,
        messageFromDelete: Message.VALUE_DELETED_FROM_DATABASE,
      };
    } catch (error) {
      Terminal.show(Message.ERROR_AT_DELETE_FROM_DATABASE);
      return {
        httpStatus: 400,
        messageFromDelete: Message.ERROR_AT_DELETE_FROM_DATABASE,
      };
    }
  }
}
