import { ApiError } from "./errors";

export class SuccessResponse {
  status = "success";
  data: {} | null;

  constructor(data: {}) {
    this.data = data ? data : null;
  }
}

export class FailResponse {
  status = "fail";
  data: {};
  constructor(data: {}) {
    this.data = data;
  }
}

export class ErrorResponse {
  status = "error";
  error = new ApiError("", "");

  constructor(error: Error) {
    this.error.name = error.name;
    this.error.message = error.message;
  }
}
