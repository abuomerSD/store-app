export class ApiError extends Error {
  constructor(name: string, message: string) {
    super();
    this.name = name;
    this.message = message;
  }
}
