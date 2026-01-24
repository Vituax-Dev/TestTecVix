import { Router } from "express";
import multer from "multer";
import path from "path";
import { API_VERSION, ROOT_PATH } from "../constants/basePathRoutes";
import { BucketController } from "../controllers/BucketController";
import { BucketLocalService } from "../services/BucketLocalService";

const BASE_PATH = API_VERSION.V1 + ROOT_PATH.UPLOADS; 
const uploadsRoutes = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, "..", "..", "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

export const makeBucketController = () => {
  const service = new BucketLocalService();
  return new BucketController(service);
};

const uploadsController = makeBucketController();

uploadsRoutes.post(`${BASE_PATH}/file`, upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: true, message: "Arquivo não enviado." });
  }

  const fileUrl = `http://localhost:3001/uploads/${req.file.filename}`;

  return res.json({
    url: fileUrl,
    objectName: req.file.filename
  });
});

uploadsRoutes.get(`${BASE_PATH}/:objectName`, async (req, res) => {
  await uploadsController.getFileInBucketByObjectName(req, res);
});

export { uploadsRoutes };