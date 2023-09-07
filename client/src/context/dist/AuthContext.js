'use client';
"use strict";
exports.__esModule = true;
exports.useAuthContext = exports.AuthProvider = exports.AuthContext = void 0;
var react_1 = require("react");
var client_1 = require("@/services/client");
exports.AuthContext = react_1.createContext({});
exports.AuthProvider = function (_a) {
    var children = _a.children;
    var client = client_1["default"]();
    return (react_1["default"].createElement(exports.AuthContext.Provider, { value: { client: client } }, children));
};
exports.useAuthContext = function () { return react_1.useContext(exports.AuthContext); };
