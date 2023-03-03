"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>App
});
const _express = _interopRequireDefault(require("express"));
const _compression = _interopRequireDefault(require("compression"));
const _cookieParser = _interopRequireDefault(require("cookie-parser"));
const _cors = _interopRequireDefault(require("cors"));
const _helmet = _interopRequireDefault(require("helmet"));
const _hpp = _interopRequireDefault(require("hpp"));
const _morgan = _interopRequireDefault(require("morgan"));
const _mongoose = _interopRequireWildcard(require("mongoose"));
const _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));
const _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
const _config = require("./config");
const _databases = require("./databases");
const _errorMiddleware = _interopRequireDefault(require("./middlewares/error.middleware"));
const _logger = require("./utils/logger");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
let App = class App {
    listen() {
        this.app.listen(this.port, ()=>{
            _logger.logger.info(`=================================`);
            _logger.logger.info(`======= ENV: ${this.env} =======`);
            _logger.logger.info(`🚀 App listening on the port ${this.port}`);
            _logger.logger.info(`=================================`);
        });
    }
    getServer() {
        return this.app;
    }
    connectToDatabase() {
        if (this.env !== 'production') {
            (0, _mongoose.set)('debug', true);
        }
        _mongoose.default.set('strictQuery', false);
        (0, _mongoose.connect)(_databases.dbConnection.url, _databases.dbConnection.options);
    }
    initializeMiddlewares() {
        this.app.use((0, _morgan.default)(_config.LOG_FORMAT, {
            stream: _logger.stream
        }));
        this.app.use((0, _cors.default)({
            origin: _config.ORIGIN,
            credentials: _config.CREDENTIALS
        }));
        this.app.use((0, _hpp.default)());
        this.app.use((0, _helmet.default)());
        this.app.use((0, _compression.default)());
        this.app.use(_express.default.json());
        this.app.use(_express.default.urlencoded({
            extended: true
        }));
        this.app.use((0, _cookieParser.default)());
    }
    initializeErrorHandling() {
        this.app.use(_errorMiddleware.default);
    }
    initializeRoutes(routes) {
        routes.forEach((route)=>{
            this.app.use('/', route.router);
        });
        this.app.use(_express.default.static('images'));
        this.app.use(_express.default.static('public'));
    }
    initializeSwagger() {
        const options = {
            swaggerDefinition: {
                components: {},
                info: {
                    title: 'REST API',
                    version: '1.0.0',
                    description: 'Shopping app RESTful API'
                }
            },
            apis: [
                'swagger.yaml'
            ]
        };
        const specs = (0, _swaggerJsdoc.default)(options);
        this.app.use('/api-docs', _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(specs));
    }
    constructor(routes){
        this.app = (0, _express.default)();
        this.env = _config.NODE_ENV || 'development';
        this.port = _config.PORT || 61155;
        this.initializeMiddlewares();
        this.initializeSwagger();
        this.initializeErrorHandling();
        this.connectToDatabase();
        this.initializeRoutes(routes);
    }
};

//# sourceMappingURL=app.js.map