import { Request } from "express";

declare global {
  namespace Express {
    namespace Multer {
      interface File {
        fieldname: string;
        originalname: string;
        encoding: string;
        mimetype: string;
        buffer: Buffer;
        size: number;
      }
    }
  }
}

export interface CustomRequest<T = unknown> extends Request {
  user?: T;
  file?: Express.Multer.File;
}
