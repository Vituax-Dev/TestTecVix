import { Response } from "express";
import { CustomRequest } from "../types/custom";
import { STATUS_CODE } from "../constants/statusCode";
import { IBucketService } from "../types/Interfaces/IBucketService";
import path from "path";

export class BucketController {
  constructor(private bucketService: IBucketService) {}

  async getFileInBucketByObjectName(
    req: CustomRequest<unknown>,
    res: Response,
  ) {
    const { objectName } = req.params;

    // Verifica se é array e retorna com código e mensagem de erro caso for array
    if (Array.isArray(objectName)) {
    return res
      .status(STATUS_CODE.BAD_REQUEST)
      .json({ message: "Invalid object name" });
    }

    const filePath = path.join(__dirname, "..", "..", "uploads", objectName);
    return res.sendFile(filePath);
  }

  async getFileByObjectName(req: CustomRequest<unknown>, res: Response) {
    const { objectName } = req.params;

    // Verifica se é array e retorna com código e mensagem de erro caso for array
    if (Array.isArray(objectName)) {
    return res
      .status(STATUS_CODE.BAD_REQUEST)
      .json({ message: "Invalid object name" });
    }

    const response = await this.bucketService.renewPresignedUrl(objectName);
    return res.status(STATUS_CODE.OK).json({ url: response });
  }

  async uploadFile(req: CustomRequest<unknown>, res: Response) {
    const file = req.file;
    if (!file)
      return res
        .status(STATUS_CODE.BAD_REQUEST)
        .send({ message: "No file uploaded" });
    const response = await this.bucketService.uploadFile(
      process.env.MINIO_BUCKET as string,
      file,
    );

    return res.status(STATUS_CODE.OK).json(response);
  }
}
