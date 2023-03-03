"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>IndexController
});
const _path = _interopRequireDefault(require("path"));
const _fs = _interopRequireDefault(require("fs"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const PUBLIC_DIR = _path.default.join(__dirname, '../../', 'public');
let IndexController = class IndexController {
    constructor(){
        this.index = (req, res, next)=>{
            try {
                res.sendFile(_path.default.join(PUBLIC_DIR, 'index.html'));
            } catch (error) {
                next(error);
            }
        };
        if (!_fs.default.existsSync(PUBLIC_DIR)) {
            _fs.default.mkdirSync(PUBLIC_DIR);
        }
    }
};

//# sourceMappingURL=index.controller.js.map