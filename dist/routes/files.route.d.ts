import { Routes } from '../interfaces/routes.interface';
import FilesService from '../services/files.service';
declare class FilesRoute implements Routes {
    path: string;
    router: any;
    filesService: FilesService;
    constructor();
    private initializeRoutes;
}
export default FilesRoute;
