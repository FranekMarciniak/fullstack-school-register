import * as express from 'express';

export const jsonResponse = (
  res: express.Response,
  code: number,
  message: string,
) => {
  return res.status(code).json({ message });
};

export const created = (res: express.Response) => {
  return res.sendStatus(201);
};
export const clientError = (res: express.Response, message?: string) => {
  return jsonResponse(res, 400, message ? message : 'Unauthorized');
};

export const unauthorized = (res: express.Response, message?: string) => {
  return jsonResponse(res, 401, message ? message : 'Unauthorized');
};

export const forbidden = (res: express.Response, message?: string) => {
  return jsonResponse(res, 403, message ? message : 'Forbidden');
};

export const notFound = (res: express.Response, message?: string) => {
  return jsonResponse(res, 404, message ? message : 'Not Found');
};

export const conflict = (res: express.Response, message?: string) => {
  return jsonResponse(res, 409, message ? message : 'Conflict');
};
export const fail = (res: express.Response, error: Error | string) => {
  return res.status(500).json({
    message: error.toString(),
  });
};
export const success = (
  res: express.Response,
  code: number,
  message: string,
) => {
  return res.status(code).json({ message });
};

export const succsesJson = (
  res: express.Response,
  code: number,
  message: string,
  data: object,
) => {
  return res.status(code).json({ message, data });
};
