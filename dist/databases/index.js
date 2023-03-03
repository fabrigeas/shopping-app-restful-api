"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "dbConnection", {
    enumerable: true,
    get: ()=>dbConnection
});
const _config = require("../config");
const dbConnection = {
    url: `mongodb1://${_config.DB_USER}:${_config.DB_PASSWORD}@${_config.DB_HOST}:${_config.DB_PORT}/${_config.DB_DATABASE}`,
    options: {}
};

//# sourceMappingURL=index.js.map