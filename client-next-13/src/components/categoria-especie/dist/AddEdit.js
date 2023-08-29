'use client';
"use strict";
exports.__esModule = true;
var LinkBack_1 = require("../LinkBack");
var CategoriaEspecie_1 = require("./CategoriaEspecie");
var navigation_1 = require("next/navigation");
var AddEdit = function () {
    var params = navigation_1.useParams();
    var id = params === null || params === void 0 ? void 0 : params.id;
    var isAddMode = !id;
    return (React.createElement("div", null,
        React.createElement("div", { className: "py-6 flex flex-col justify-center sm:py-12 bg-gray-50 text-sm" },
            React.createElement("div", { className: "relative py-3 w-11/12 max-w-none lg:max-w-2xl mx-auto" },
                React.createElement("div", { className: 'flex flex-row items-center justify-between border-x border-t border-gray-400 bg-gray-100 py-4 rounded-t-xl' },
                    React.createElement("div", null,
                        React.createElement(LinkBack_1.LinkBack, { href: "/categoria-especie", className: "flex flex-col relative left-0 ml-4" })),
                    React.createElement("div", null, isAddMode ? (React.createElement("h1", { className: 'text-xl text-gray-800' }, "Cadastrar Categoria de Esp\u00E9cies")) : (React.createElement("h1", { className: 'text-xl text-gray-800' }, "Editar Categoria"))),
                    React.createElement("div", null)),
                React.createElement(CategoriaEspecie_1["default"], { id: id })))));
};
exports["default"] = AddEdit;
