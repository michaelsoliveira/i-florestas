"use strict";
exports.__esModule = true;
var withAuthentication_1 = require("src/components/withAuthentication");
var index_1 = require("src/components/projeto/index");
var ProjetoIndex = function () {
    return (React.createElement("div", null,
        React.createElement(index_1["default"], null)));
};
exports["default"] = withAuthentication_1["default"](ProjetoIndex);
