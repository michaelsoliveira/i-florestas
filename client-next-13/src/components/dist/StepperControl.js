'use client';
"use strict";
exports.__esModule = true;
var classnames_1 = require("classnames");
var ModalContext_1 = require("@/context/ModalContext");
var StepContext_1 = require("@/context/StepContext");
var react_1 = require("react");
var StepperControl = function (_a) {
    var steps = _a.steps, handleClick = _a.handleClick;
    var _b = react_1.useContext(StepContext_1.StepContext), step = _b.step, nextStep = _b.nextStep, prevStep = _b.prevStep, dataStep = _b.data, updateData = _b.updateData, setStep = _b.setStep;
    var _c = ModalContext_1.useModalContext(), hideModal = _c.hideModal, store = _c.store;
    var visible = store.visible;
    return (React.createElement("div", { className: "container flex justify-between mt-4" },
        React.createElement("button", { onClick: function () { return handleClick(); }, className: classnames_1["default"]("bg-white text-slate-400 uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-200 hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out", !visible && step === 1 ? "opacity-50 cursor-not-allowed" : "") }, visible && step === 1 ? "Fechar" : "Voltar"),
        React.createElement("button", { onClick: function () { return handleClick('next'); }, className: classnames_1["default"]("bg-green-700 text-white uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-200 hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out") }, step === steps.length ? "Finalizar Importação" : "Prosseguir")));
};
exports["default"] = StepperControl;
