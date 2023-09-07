'use client';
"use strict";
exports.__esModule = true;
exports.ProjetoProvider = exports.ProjetoContext = void 0;
var react_1 = require("react");
exports.ProjetoContext = react_1.createContext({});
function ProjetoProvider(_a) {
    var children = _a.children;
    var _b = react_1.useState(), projeto = _b[0], setProjeto = _b[1];
    return (react_1["default"].createElement(exports.ProjetoContext.Provider, { value: { projeto: projeto, setProjeto: setProjeto } }, children));
}
exports.ProjetoProvider = ProjetoProvider;
