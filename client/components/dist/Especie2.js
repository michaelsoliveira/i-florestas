"use strict";
exports.__esModule = true;
var Especie2 = function () {
    return (React.createElement("div", null,
        React.createElement("form", { className: "form bg-white p-6 my-10 relative" },
            React.createElement("div", { className: "icon bg-blue-600 text-white w-6 h-6 absolute flex items-center justify-center p-5" },
                React.createElement("i", { className: "fal fa-phone-volume fa-fw text-2xl transform -rotate-45" })),
            React.createElement("h3", { className: "text-2xl text-gray-900 font-semibold" }, "Let us call you!"),
            React.createElement("p", { className: "text-gray-600" }, " To help you choose your property"),
            React.createElement("div", { className: "flex space-x-5 mt-3" },
                React.createElement("input", { type: "text", name: "nome", id: "nome", placeholder: "Nome Esp\u00E9cie", className: "border p-2  w-1/2" }),
                React.createElement("input", { type: "tel", name: "nomeOrgao", id: "nomeOrgao", placeholder: "Nome Vulgar", className: "border p-2 w-1/2" })),
            React.createElement("input", { type: "email", name: "nomeCientifico", id: "nomeCientifico", placeholder: "Nome Cient\u00EDfico", className: "border p-2 w-full mt-3" }),
            React.createElement("input", { type: "submit", value: "Submit", className: "w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white font-semibold p-3" }))));
};
exports["default"] = Especie2;
