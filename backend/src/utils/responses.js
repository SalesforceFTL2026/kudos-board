const success = (res, data, statusCode = 200) => {
  return res.status(statusCode).json(data);
};

const created = (res, data) => {
  return res.status(201).json(data);
};

const error = (res, message, statusCode = 500) => {
  return res.status(statusCode).json({ error: message });
};

const notFound = (res, message = "Resource not found") => {
  return res.status(404).json({ error: message });
};

const badRequest = (res, message = "Bad request") => {
  return res.status(400).json({ error: message });
};

module.exports = {
  success,
  created,
  error,
  notFound,
  badRequest,
};
