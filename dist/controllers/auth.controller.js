"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _authService = _interopRequireDefault(require("../services/auth.service"));
const _constants = require("../utils/constants");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let AuthController = class AuthController {
    constructor(){
        this.authService = new _authService.default();
        this.signUp = async (req, res, next)=>{
            try {
                const userData = req.body;
                const user = await this.authService.signUp(userData);
                res.status(_constants.STATUS_CODES.CREATED).json({
                    user,
                    message: _constants.STATUS_MESSAGE.CREATED
                });
            } catch (error) {
                next(error);
            }
        };
        this.logIn = async (req, res, next)=>{
            try {
                const userData = req.body;
                const { cookie , user  } = await this.authService.signIn(userData);
                res.setHeader('Set-Cookie', [
                    cookie
                ]);
                res.status(_constants.STATUS_CODES.SUCCESS).json({
                    user: user,
                    message: 'signed in'
                });
            } catch (error) {
                next(error);
            }
        };
        this.logOut = async (req, res, next)=>{
            try {
                const userData = req.user;
                const user = await this.authService.signOut(userData);
                res.setHeader('Set-Cookie', [
                    'Authorization=; Max-age=0'
                ]);
                res.status(_constants.STATUS_CODES.SUCCESS).json({
                    user,
                    message: 'signed out'
                });
            } catch (error) {
                next(error);
            }
        };
    }
};
const _default = AuthController;

//# sourceMappingURL=auth.controller.js.map