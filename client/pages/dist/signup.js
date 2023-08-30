"use strict";
exports.__esModule = true;
var AddEdit_1 = require("@/components/user/AddEdit");
var Logo_1 = require("components/Logo");
var solid_1 = require("@heroicons/react/24/solid");
var link_1 = require("next/link");
var react_1 = require("react");
var defaultStyles_1 = require("components/helpers/defaultStyles");
var ModalContext_1 = require("contexts/ModalContext");
var react_2 = require("next-auth/react");
var SigupPage = function () {
    var hideModal = ModalContext_1.useModalContext().hideModal;
    var session = react_2.useSession().data;
    var formRef = react_1.createRef();
    var submitForm = function () {
        if (formRef.current) {
            formRef.current.handleSubmit();
            hideModal();
        }
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { className: "min-h-full flex items-center justify-center my-24 px-4 sm:px-6 lg:px-8" },
            react_1["default"].createElement("div", { className: "max-w-md flex flex-col justify-center items-center w-full space-y-4 px-8 py-4 border rounded-md shadow-2xl" },
                react_1["default"].createElement("div", { className: 'flex bg-gray-50 border absolute top-20 border-green-700 justify-center items-center rounded-full shadow-lg w-36 h-36' },
                    react_1["default"].createElement("div", { className: 'relative flex flex-col items-center justify-center' },
                        react_1["default"].createElement(Logo_1["default"], { width: 'w-16', height: 'h-16' }),
                        react_1["default"].createElement("h1", { className: 'font-roboto text-md font-semibold text-green-700' }, "BOManejoWeb"))),
                react_1["default"].createElement("div", { className: 'w-full pt-20' },
                    react_1["default"].createElement(AddEdit_1.AddEdit, { projetoId: '', ref: formRef, styles: defaultStyles_1.styles, redirect: true }),
                    react_1["default"].createElement("div", { className: 'mx-auto flex flex-row items-center justify-center py-4' },
                        react_1["default"].createElement("button", { 
                            // disabled={formState.isSubmitting}
                            type: "submit", className: "group relative w-3/4 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500", onClick: submitForm },
                            react_1["default"].createElement("span", { className: "absolute left-0 inset-y-0 flex items-center pl-3" },
                                react_1["default"].createElement(solid_1.UserAddIcon, { className: "h-5 w-5 text-green-500 group-hover:text-green-400", "aria-hidden": "true" })),
                            "Cadastrar"))),
                react_1["default"].createElement("div", { className: 'w-full border-b border-gray-200 flex items-center' },
                    react_1["default"].createElement("p", { className: 'text-xs py-4 flex items-center text-center' }, "Ao se cadastrar, voc\u00EA concordar com nossos Termos de Uso e com a Pol\u00EDtica de Privacidade")),
                !session && (react_1["default"].createElement("p", { className: 'flex items-center text-center text-sm' },
                    "J\u00E1 tem conta?\u00A0",
                    react_1["default"].createElement("span", { className: 'underline font-bold text-green-700' },
                        " ",
                        react_1["default"].createElement(link_1["default"], { href: '/login' }, "Fa\u00E7a login"))))))));
};
exports["default"] = SigupPage;
