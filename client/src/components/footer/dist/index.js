'use client';
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var ItemsContainer_1 = require("./ItemsContainer");
var SocialIcons_1 = require("./SocialIcons");
var navigation_1 = require("next/navigation");
var Footer = function () {
    var index = navigation_1.usePathname() === '/';
    return (react_1["default"].createElement("footer", { className: "bg-gray-800 text-white" },
        index && (react_1["default"].createElement("div", { className: "md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#ffffff19] py-2" },
            react_1["default"].createElement("h1", { className: "lg:text-3xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold\n          md:w-2/5" },
                react_1["default"].createElement("span", { className: "text-teal-400" }, "Acesso Gratuito"),
                " para o gerenciamento de invent\u00E1rio"),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement("input", { type: "text", placeholder: "Entre com seu email para mais informa\u00E7\u00F5es", className: "text-gray-800\n            sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2 rounded px-2 focus:outline-none" }),
                react_1["default"].createElement("button", { className: "bg-teal-600 hover:bg-teal-500 duration-300 px-5 py-2\n            rounded-md text-white md:w-auto w-full" }, "Enviar")))),
        react_1["default"].createElement(ItemsContainer_1["default"], null),
        react_1["default"].createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12\n      text-center text-gray-400 text-sm pb-4" },
            react_1["default"].createElement("span", null, "\u00A9 2020 Appy. All rights reserved."),
            react_1["default"].createElement("span", null, "Terms \u00B7 Privacy Policy"),
            react_1["default"].createElement(SocialIcons_1["default"], null))));
};
exports["default"] = Footer;
