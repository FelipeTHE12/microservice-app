import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
  reason: string = "Erro ao conectar ao database";
  statusCode = 500;

  constructor() {
    super("Erro ao conectar banco de dados");

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
  serializeErrors() {
    return [{ message: this.reason }];
  }
}
