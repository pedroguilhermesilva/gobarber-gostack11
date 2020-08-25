class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  constructor(message: string, statuscCode = 400) {
    this.message = message;
    this.statusCode = statuscCode;
  }
}

export default AppError;
