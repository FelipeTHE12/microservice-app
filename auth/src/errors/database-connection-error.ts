export class DatabaseConnectionError extends Error {
  reason: string = "Erro ao conectar ao database";

  constructor() {
    super();

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}
