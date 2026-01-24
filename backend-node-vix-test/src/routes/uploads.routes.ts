import { Router } from "express";
import { API_VERSION, ROOT_PATH } from "../constants/basePathRoutes";
import { BucketController } from "../controllers/BucketController";
import { BucketLocalService } from "../services/BucketLocalService";
import multer from "multer";

const BASE_PATH = API_VERSION.V1 + ROOT_PATH.UPLOADS; // /api/v1/uploads

const uploadsRoutes = Router();

// Configuração do multer para upload em memória
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB
  },
});

export const makeBucketController = () => {
  const service = new BucketLocalService();
  return new BucketController(service);
};

const uploadsController = makeBucketController();

// Upload de arquivo
uploadsRoutes.post(`${BASE_PATH}/file`, upload.single("file"), async (req, res) => {
  await uploadsController.uploadFile(req, res);
});

// Retorna a URL do arquivo (para uso no frontend)
uploadsRoutes.get(`${BASE_PATH}/file/:objectName`, async (req, res) => {
  await uploadsController.getFileUrl(req, res);
});

// Serve o arquivo diretamente (para uso como src de imagem)
uploadsRoutes.get(`${BASE_PATH}/:objectName`, async (req, res) => {
  await uploadsController.getFileInBucketByObjectName(req, res);
});

export { uploadsRoutes };
