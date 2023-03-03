"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    STATUS_CODES: ()=>STATUS_CODES,
    STATUS_MESSAGE: ()=>STATUS_MESSAGE
});
const STATUS_CODES = {
    SUCCESS: 200,
    CREATED: 201,
    UN_AUTHORIZED: 300,
    BAD_REQUEST: 400,
    CONFLICT: 409,
    SERVER_ERROR: 500
};
const STATUS_MESSAGE = {
    FIND_ALL: 'findALL',
    FIND_ONE: 'findOne',
    CREATED: 'created',
    UPDATED: 'updated',
    DELETED: 'deleted'
};

//# sourceMappingURL=constants.js.map