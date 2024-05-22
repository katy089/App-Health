class ClientError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
  }
}

class FetchError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.status = status;
  }
}

const getErrorMessage = (error) => {
  let message;

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Something error";
  }

  return message;
};

const getErrorName = (error) => {
  let name;

  if (error instanceof Error) {
    name = error.name;
  } else if (error && typeof error === "object" && "name" in error) {
    name = String(error.name);
  } else if (typeof error === "string") {
    name = error;
  } else {
    name = "Something error";
  }

  return name;
};

module.exports = {
  ClientError,
  FetchError,
  getErrorMessage,
  getErrorName,
};
