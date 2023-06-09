class CustomError extends Error {
  statusCode?: number = 500;

  constructor(message: string, statusCode?: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default CustomError;
