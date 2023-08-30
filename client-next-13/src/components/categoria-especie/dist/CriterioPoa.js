'use client';
"use strict";
exports.__esModule = true;
exports.CriterioPoa = void 0;
var outline_1 = require("@heroicons/react/outline");
var ModalContext_1 = require("@/context/ModalContext");
var styles_1 = require("../Utils/styles");
var CategoriaEspecie_1 = require("./CategoriaEspecie");
var react_1 = require("react");
exports.CriterioPoa = function (_a) {
    var checkedCategorias = _a.checkedCategorias, categorias = _a.categorias, handleSelectAllCategorias = _a.handleSelectAllCategorias, handleSelectCategoria = _a.handleSelectCategoria, loadCategorias = _a.loadCategorias;
    var showModal = ModalContext_1.useModalContext().showModal;
    var formRef = react_1.useRef();
    var updateCategoriaModal = function (id) {
        showModal({
            title: 'Editar Critério',
            size: 'max-w-2xl',
            type: 'submit', hookForm: 'hook-form', styleButton: styles_1.styles.greenButton, confirmBtn: 'Salvar',
            onConfirm: function () {
                if (formRef.current) {
                    formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                }
            },
            content: React.createElement("div", null,
                React.createElement(CategoriaEspecie_1["default"], { ref: formRef, id: id, loadCategorias: loadCategorias, isModal: true }))
        });
    };
    return (React.createElement("div", { id: 'criterios' },
        React.createElement("table", { className: "min-w-full divide-y divide-gray-200" },
            React.createElement("thead", { className: "bg-gray-50" },
                React.createElement("tr", null,
                    checkedCategorias ? (React.createElement("th", { className: "w-1/12" },
                        React.createElement("div", { className: "flex justify-center" },
                            React.createElement("input", { checked: (checkedCategorias === null || checkedCategorias === void 0 ? void 0 : checkedCategorias.length) === (categorias === null || categorias === void 0 ? void 0 : categorias.length), onChange: handleSelectAllCategorias, className: "form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer", type: "checkbox", value: "", id: "flexCheckDefault" })))) : (React.createElement(React.Fragment, null,
                        React.createElement("th", null))),
                    React.createElement("th", { className: "w-4/12" },
                        React.createElement("span", { className: "flex flex-row items-center px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" }, "Nome")),
                    React.createElement("th", { scope: "col", className: "px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Fuste"),
                    React.createElement("th", { scope: "col", className: "w-1/12 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Diametro M\u00EDnimo"),
                    React.createElement("th", { scope: "col", className: "w-1/12 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Diametro M\u00E1ximo"),
                    React.createElement("th", { scope: "col", className: "px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" }, "Altura"),
                    React.createElement("th", { scope: "col", className: "px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" }, "Volume"),
                    React.createElement("th", { scope: "col", className: "px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" }, "Preservada"))),
            React.createElement("tbody", { className: "bg-white divide-y divide-gray-200" }, categorias === null || categorias === void 0 ? void 0 : categorias.map(function (categoria) { return (React.createElement("tr", { key: categoria.id },
                checkedCategorias ? (React.createElement("td", { className: "flex justify-center" },
                    React.createElement("input", { value: categoria === null || categoria === void 0 ? void 0 : categoria.id, checked: checkedCategorias.includes(categoria === null || categoria === void 0 ? void 0 : categoria.id), onChange: handleSelectCategoria, id: "poaId", type: "checkbox", className: "form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" }))) : (React.createElement(React.Fragment, null,
                    React.createElement("td", null,
                        React.createElement("div", null,
                            React.createElement("a", null,
                                React.createElement("button", { onClick: function () { return updateCategoriaModal(categoria.id); } },
                                    React.createElement(outline_1.PencilIcon, { className: "w-5 h-5 ml-4 -mr-1 text-green-600 hover:text-green-700" }))))))),
                React.createElement("td", { className: "px-3 py-2 whitespace-nowrap" },
                    React.createElement("div", { className: "flex flex-col items-starter" },
                        React.createElement("div", { className: "text-sm font-medium text-gray-900" }, categoria === null || categoria === void 0 ? void 0 : categoria.nome))),
                React.createElement("td", { className: "px-3 py-2 whitespace-nowrap" },
                    React.createElement("div", { className: "text-sm text-gray-900" }, categoria === null || categoria === void 0 ? void 0 : categoria.criterio_fuste)),
                React.createElement("td", { className: "px-3 py-2 whitespace-nowrap" },
                    React.createElement("span", { className: "text-sm font-medium text-gray-900" },
                        React.createElement("div", { className: "text-sm text-gray-500" }, categoria === null || categoria === void 0 ? void 0 : categoria.criterio_dminc))),
                React.createElement("td", { className: "px-3 py-2 whitespace-nowrap" },
                    React.createElement("span", { className: "text-sm font-medium text-gray-900" },
                        React.createElement("div", { className: "text-sm text-gray-500" }, categoria === null || categoria === void 0 ? void 0 : categoria.criterio_dmaxc))),
                React.createElement("td", { className: "px-3 py-2 whitespace-nowrap" },
                    React.createElement("span", { className: "text-sm font-medium text-gray-900" },
                        React.createElement("div", { className: "text-sm text-gray-500" }, categoria === null || categoria === void 0 ? void 0 : categoria.criterio_altura))),
                React.createElement("td", { className: "px-3 py-2 whitespace-nowrap" },
                    React.createElement("span", { className: "text-sm font-medium text-gray-900" },
                        React.createElement("div", { className: "text-sm text-gray-500" }, categoria === null || categoria === void 0 ? void 0 : categoria.criterio_volume))),
                React.createElement("td", { className: "px-3 py-2 whitespace-nowrap" },
                    React.createElement("span", { className: "text-sm font-medium text-gray-900" },
                        React.createElement("div", { className: "text-sm text-gray-500" }, (categoria === null || categoria === void 0 ? void 0 : categoria.preservar) ? (React.createElement("div", null, "Sim"))
                            : (React.createElement("div", null, "N\u00E3o"))))))); })))));
};
