'use client';
"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var classnames_1 = require("classnames");
var react_1 = require("react");
var SelectableRowList = function (_a) {
    var data = _a.data, callBack = _a.callBack;
    var _b = react_1.useState([]), selectedRows = _b[0], setSelectedRows = _b[1];
    var handleRowClick = function (rowId) {
        if (selectedRows.includes(rowId)) {
            setSelectedRows(selectedRows.filter(function (id) { return id !== rowId; }));
            callBack(selectedRows.filter(function (id) { return id !== rowId; }));
        }
        else {
            setSelectedRows(__spreadArrays(selectedRows, [rowId]));
            callBack(__spreadArrays(selectedRows, [rowId]));
        }
    };
    var handleSelectAll = function () {
        if ((selectedRows === null || selectedRows === void 0 ? void 0 : selectedRows.length) < (data === null || data === void 0 ? void 0 : data.length)) {
            setSelectedRows(data.map(function (_a) {
                var id = _a.id;
                return id;
            }));
            callBack(data.map(function (_a) {
                var id = _a.id;
                return id;
            }));
        }
        else {
            setSelectedRows([]);
            callBack([]);
        }
    };
    return (react_1["default"].createElement("div", { className: 'w-full' },
        react_1["default"].createElement("div", { className: "mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem] text-sm" },
            react_1["default"].createElement("input", { className: "form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer", type: "checkbox", value: "", id: "flexCheckDefault", checked: (selectedRows === null || selectedRows === void 0 ? void 0 : selectedRows.length) === (data === null || data === void 0 ? void 0 : data.length), onChange: handleSelectAll }),
            react_1["default"].createElement("label", { className: "inline-block pl-[0.15rem] hover:cursor-pointer" }, "Selecionar Todos")),
        react_1["default"].createElement("ul", { className: "text-sm text-gray-900 bg-white border border-gray-200 rounded-lg h-[25rem] overflow-y-auto" }, data.map(function (row, idx) { return (react_1["default"].createElement("li", { key: row.id, onClick: function () { return handleRowClick(row.id); }, className: classnames_1["default"](selectedRows.includes(row.id) && (idx === 0 ? 'rounded-t-lg text-white bg-blue-700' : 'text-white bg-blue-700'), (idx === 0 && 'border-t-lg'), (idx === data.length - 1 && 'rounded-b-lg border-b-lg'), (idx < data.length - 1 && 'border-b'), (!selectedRows.includes(row.id) && 'hover:bg-gray-100 hover:text-blue-700'), 'block w-full px-4 py-2 border-gray-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700') }, row.label)); }))));
};
exports["default"] = SelectableRowList;
