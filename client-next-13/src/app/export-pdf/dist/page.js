'use client';
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var invoice_1 = require("@/services/invoice");
var dynamic_1 = require("next/dynamic");
var Invoice = dynamic_1["default"](function () { return Promise.resolve().then(function () { return require('@/components/reports/Invoice'); }); }, { ssr: false });
var ExportPDFIndex = function () {
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { className: 'flex items-center justify-center w-full my-10' },
            react_1["default"].createElement(Invoice, { invoice: invoice_1["default"] }))));
};
exports["default"] = ExportPDFIndex;
