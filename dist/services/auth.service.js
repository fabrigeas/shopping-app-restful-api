"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _bcrypt = require("bcrypt");
const _jsonwebtoken = require("jsonwebtoken");
const _config = require("../config");
const _httpException = require("../exceptions/HttpException");
const _usersModel = _interopRequireDefault(require("../models/users.model"));
const _util = require("../utils/util");
const _constants = require("../utils/constants");
function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === 'function') {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _defineProperty(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpreadProps(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
const MISSING_USER_DATA = 'userData is empty';
let AuthService = class AuthService {
    async signUp(userData) {
        if ((0, _util.isEmpty)(userData)) throw new _httpException.HttpException(_constants.STATUS_CODES.SUCCESS, MISSING_USER_DATA);
        const user = await this.users.findOne({
            email: userData.email
        });
        if (user) throw new _httpException.HttpException(_constants.STATUS_CODES.CONFLICT, `This email ${userData.email} already exists`);
        const hashedPassword = await (0, _bcrypt.hash)(userData.password, 10);
        const createUserData = await this.users.create(_objectSpreadProps(_objectSpread({}, userData), {
            password: hashedPassword
        }));
        return createUserData;
    }
    async signIn(userData) {
        if ((0, _util.isEmpty)(userData)) throw new _httpException.HttpException(_constants.STATUS_CODES.SUCCESS, MISSING_USER_DATA);
        const user = await this.users.findOne({
            email: userData.email
        });
        if (!user) throw new _httpException.HttpException(_constants.STATUS_CODES.CONFLICT, `This email ${userData.email} was not found`);
        const isPasswordMatching = await (0, _bcrypt.compare)(userData.password, user.password);
        if (!isPasswordMatching) throw new _httpException.HttpException(_constants.STATUS_CODES.CONFLICT, 'Password is not matching');
        const token = this.createToken(user);
        const cookie = this.createCookie(token);
        return {
            cookie,
            user,
            token
        };
    }
    async signOut(userData) {
        if ((0, _util.isEmpty)(userData)) throw new _httpException.HttpException(_constants.STATUS_CODES.BAD_REQUEST, MISSING_USER_DATA);
        const user = await this.users.findOne({
            email: userData.email,
            password: userData.password
        });
        if (!user) throw new _httpException.HttpException(_constants.STATUS_CODES.CONFLICT, `This email ${userData.email} was not found`);
        return user;
    }
    createToken(user) {
        const dataStoredInToken = {
            _id: user._id
        };
        const secretKey = _config.SECRET_KEY;
        const expiresIn = 60 * 60;
        return {
            expiresIn,
            token: (0, _jsonwebtoken.sign)(dataStoredInToken, secretKey, {
                expiresIn
            })
        };
    }
    createCookie(token) {
        return `Authorization=${token.token}; HttpOnly; Max-Age=${token.expiresIn};`;
    }
    constructor(){
        this.users = _usersModel.default;
    }
};
const _default = AuthService;

//# sourceMappingURL=auth.service.js.map