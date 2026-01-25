import { Router } from "express";
import multer from "multer";
import { API_VERSION, ROOT_PATH } from "../constants/basePathRoutes";
import { BucketController } from "../controllers/BucketController";
import { BucketLocalService } from "../services/BucketLocalService";

const BASE_PATH = API_VERSION.V1 + ROOT_PATH.UPLOADS; // /api/v1/uploads

const uploadsRoutes = Router();

export const makeBucketController = () => {
  const service = new BucketLocalService();
  return new BucketController(service);
};

const uploadsController = makeBucketController();

uploadsRoutes.post(
  `${BASE_PATH}/file`,
  multer({ storage: multer.memoryStorage() }).single("file"),
  async (req, res) => {
    await uploadsController.uploadFile(req, res);
  },
);

uploadsRoutes.get(`${BASE_PATH}/file/:objectName`, async (req, res) => {
  await uploadsController.getFileByObjectName(req, res);
});

uploadsRoutes.get(`${BASE_PATH}/:objectName`, async (req, res) => {
  await uploadsController.getFileInBucketByObjectName(req, res);
});

export { uploadsRoutes };
