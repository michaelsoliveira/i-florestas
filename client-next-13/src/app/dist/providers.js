"use client";
"use strict";
exports.__esModule = true;
exports.NextAuthProvider = void 0;
var react_1 = require("next-auth/react");
exports.NextAuthProvider = function (_a) {
    var children = _a.children;
    return React.createElement(react_1.SessionProvider, null, children);
};
