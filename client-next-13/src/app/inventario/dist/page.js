'use client';
"use strict";
exports.__esModule = true;
var withAuthentication_1 = require("src/components/withAuthentication");
var Index_1 = require("src/components/inventario/Index");
var InventarioIndex = function () {
    return (React.createElement(React.Fragment, null,
        React.createElement(Index_1["default"], null)));
};
exports["default"] = withAuthentication_1["default"](InventarioIndex);
