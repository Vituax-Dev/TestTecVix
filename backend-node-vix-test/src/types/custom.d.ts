import { Request } from "express";
import { File } from "multer";

export interface CustomRequest<T> extends Request {
  user?: T;
  file?: File;
}
