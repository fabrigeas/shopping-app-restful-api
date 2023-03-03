"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _express = require("express");
const _filesService = _interopRequireDefault(require("../services/files.service"));
const _validationMiddleware = _interopRequireDefault(require("../middlewares/validation.middleware"));
const _fileDto = require("../dtos/file.dto");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let FilesRoute = class FilesRoute {
    initializeRoutes() {
        this.router.put(`${this.path}/:id`, this.filesService.uploadFile);
        this.router.delete(`${this.path}/:id`, this.filesService.deleteFile);
        this.router.delete(`${this.path}/:id`, (0, _validationMiddleware.default)(_fileDto.DeleteFileDto, 'header'), this.filesService.deleteFile);
    }
    constructor(){
        this.path = '/api/files';
        this.router = (0, _express.Router)();
        this.filesService = new _filesService.default();
        this.initializeRoutes();
    }
};
const _default = FilesRoute;

//# sourceMappingURL=files.route.js.map