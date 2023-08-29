"use strict";
exports.__esModule = true;
var withAuthentication_1 = require("src/components/withAuthentication");
var Index_1 = require("src/components/process/Index");
var PoaIndex = function () {
    return (React.createElement("div", null,
        React.createElement(Index_1["default"], null)));
};
exports["default"] = withAuthentication_1["default"](PoaIndex);
