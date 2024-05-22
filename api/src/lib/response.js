const errorResponse = (res, status = 400, message) => {
  res.status(status).json({
    error: true,
    message,
  });
};

const messageResponse = (res, status, message) => {
  return res.status(status).json({ error: false, message });
};

const dataResponse = (res, status, data) => {
  return res.status(status).json({ error: false, data });
};

module.exports = {
  errorResponse,
  messageResponse,
  dataResponse,
};
