"use strict";
exports.__esModule = true;
var Projeto = function () {
    return (React.createElement("div", null,
        React.createElement("div", { className: "bg-gray-100 py-6 flex flex-col justify-center sm:py-12" },
            React.createElement("div", { className: "relative py-3 w-11/12 max-w-xl sm:mx-auto" },
                React.createElement("div", { className: "relative p-8 bg-white shadow-sm sm:rounded-xl" },
                    React.createElement("form", { className: "w-full" },
                        React.createElement("div", { className: "floating-input mb-5 relative" },
                            React.createElement("input", { type: "text", id: "nome", className: "input-text", placeholder: "Nome", autoComplete: "off" }),
                            React.createElement("label", { className: "absolute top-0 left-0 px-3 py-5 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out" }, "Nome")),
                        React.createElement("div", { className: "floating-input mb-5 relative" },
                            React.createElement("input", { type: "password", id: "password", className: "input-text", placeholder: "password", autoComplete: "off" }),
                            React.createElement("label", { className: "absolute top-0 left-0 px-3 py-5 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out " }, "Password")),
                        React.createElement("button", { className: "w-full bg-green-600 text-white p-3 rounded-md" }, "Submit")))))));
};
exports["default"] = Projeto;
