import { Request, Response, NextFunction } from 'express';
declare class FileService {
    constructor();
    uploadFile(req: Request, res: Response, next: NextFunction): void;
    deleteFile(req: Request, res: Response, next: NextFunction): void;
}
export default FileService;
