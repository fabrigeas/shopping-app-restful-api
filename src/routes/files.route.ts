import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import FilesService from '@services/files.service';
import validationMiddleware from '@middlewares/validation.middleware';
import { DeleteFileDto } from '@dtos/file.dto';

class FilesRoute implements Routes {
  public path = '/api/files';
  public router = Router();
  public filesService = new FilesService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.put(`${this.path}/:id`, this.filesService.uploadFile);
    this.router.delete(`${this.path}/:id`, this.filesService.deleteFile);
    this.router.delete(
      `${this.path}/:id`,
      validationMiddleware(DeleteFileDto, 'header'),
      this.filesService.deleteFile,
    );
  }
}

export default FilesRoute;
