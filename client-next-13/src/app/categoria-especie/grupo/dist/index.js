"use strict";
exports.__esModule = true;
var GrupoCategoriaEspecie_1 = require("src/components/categoria-especie/GrupoCategoriaEspecie");
var withAuthentication_1 = require("src/components/withAuthentication");
var GrupoCategoriaIndex = function () {
    return (React.createElement("div", null,
        React.createElement(GrupoCategoriaEspecie_1["default"], null)));
};
exports["default"] = withAuthentication_1["default"](GrupoCategoriaIndex);
