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
    const filePath = path.join(
      __dirname,
      "..",
      "..",
      "uploads",
      objectName as string,
    );
    return res.sendFile(filePath);
  }

  // Retorna a URL para acessar o arquivo diretamente
  async getFileUrl(req: CustomRequest<unknown>, res: Response) {
    const { objectName } = req.params;
    const baseUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT || 3001}`;
    const url = `${baseUrl}/api/v1/uploads/${objectName}`;
    return res.status(STATUS_CODE.OK).json({ url });
  }

  async getFileByObjectName(req: CustomRequest<unknown>, res: Response) {
    const { objectName } = req.params;
    const response = await this.bucketService.renewPresignedUrl(
      objectName as string,
    );
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
