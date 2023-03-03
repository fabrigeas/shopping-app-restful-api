"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _httpException = require("../exceptions/HttpException");
const _fs = _interopRequireDefault(require("fs"));
const _constants = require("../utils/constants");
const _formidable = _interopRequireDefault(require("formidable"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const IMAGES_BASE_DIR = './images';
const IMAGES_DIR = `${IMAGES_BASE_DIR}/offers`;
let FileService = class FileService {
    uploadFile(req, res, next) {
        const formData = new _formidable.default.IncomingForm();
        formData.parse(req, (_err, _fields, persistentFile)=>{
            try {
                var _persistentFile_file;
                const file = (_persistentFile_file = persistentFile === null || persistentFile === void 0 ? void 0 : persistentFile.file) !== null && _persistentFile_file !== void 0 ? _persistentFile_file : persistentFile.upfile;
                const { id  } = req.params;
                const { originalFilename , filepath  } = file;
                const dir = `${IMAGES_DIR}/${id}`;
                if (!_fs.default.existsSync(dir)) {
                    _fs.default.mkdirSync(dir);
                }
                _fs.default.rename(filepath, `${dir}/${originalFilename}`, (error)=>{
                    if (error) {
                        throw new _httpException.HttpException(_constants.STATUS_CODES.BAD_REQUEST, error.message);
                    }
                    res.status(_constants.STATUS_CODES.CREATED).json({
                        originalFilename,
                        message: 'uploaded'
                    });
                });
            } catch (error) {
                next(error);
            }
        });
    }
    deleteFile(req, res, next) {
        const { id  } = req.params;
        const { filename  } = req.headers;
        const dir = `${IMAGES_DIR}/${id}`;
        try {
            if (!_fs.default.existsSync(dir)) {
                res.status(_constants.STATUS_CODES.SUCCESS).send(`${dir} Does not exist`);
                return;
            }
            if (filename) {
                const file = `${dir}/${filename}`;
                if (!_fs.default.existsSync(file)) {
                    res.status(_constants.STATUS_CODES.SUCCESS).send(`${file} Does not exist`);
                    return;
                }
                _fs.default.rmSync(file);
                if (_fs.default.readdirSync(dir).length < 1) {
                    _fs.default.rmdirSync(dir);
                    res.status(_constants.STATUS_CODES.SUCCESS).send(`Deleted '${dir}' because it is now empty`);
                    return;
                }
                res.status(_constants.STATUS_CODES.SUCCESS).send(`${file} Deleted`);
            } else {
                _fs.default.rmdirSync(dir, {
                    recursive: true
                });
                res.status(_constants.STATUS_CODES.SUCCESS).send(`${dir} `);
                return;
            }
        } catch (error) {
            next(error);
        }
    }
    constructor(){
        if (!_fs.default.existsSync(IMAGES_BASE_DIR)) {
            _fs.default.mkdirSync(IMAGES_BASE_DIR);
        }
        if (!_fs.default.existsSync(IMAGES_DIR)) {
            _fs.default.mkdirSync(IMAGES_DIR);
        }
    }
};
const _default = FileService;

//# sourceMappingURL=files.service.js.map