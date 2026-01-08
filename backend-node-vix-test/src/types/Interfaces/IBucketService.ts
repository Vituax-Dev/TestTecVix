import { Express } from "express";

export interface IBucketService {
  /**
   * Verifica se o bucket existe e cria-o se necessário.
   * @param bucket - Nome do bucket a ser verificado/criado.
   * @returns Uma Promise que resolve quando a operação é concluída.
   */
  ensureBucketExists(bucket: string): Promise<void>;

  /**
   * Gera uma URL assinada para acessar um objeto armazenado.
   * @param objectName - Nome do objeto no bucket.
   * @param bucket - Nome do bucket onde o objeto está armazenado.
   * @returns Uma Promise que resolve para a URL assinada.
   */
  renewPresignedUrl(objectName: string, bucket?: string): Promise<string>;

  /**
   * Faz o upload de um arquivo para um bucket.
   * @param bucket - Nome do bucket onde o arquivo será armazenado.
   * @param file - Arquivo enviado pelo cliente, no formato Multer.
   * @returns Uma Promise que resolve com informações do objeto e a URL para acesso.
   */
  uploadFile(
    bucket: string,
    file: Express.Multer.File,
  ): Promise<{
    objectName: string;
    url: string;
  }>;
}
