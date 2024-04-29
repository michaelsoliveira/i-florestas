'use client';
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var classnames_1 = require("classnames");
var react_1 = require("react");
var Icons_1 = require("./Icons");
var _a = require('react-table'), useTable = _a.useTable, useFilters = _a.useFilters, useGlobalFilter = _a.useGlobalFilter, useAsyncDebounce = _a.useAsyncDebounce, useSortBy = _a.useSortBy, usePagination = _a.usePagination;
var EditableTable = function (_a) {
    var columns = _a.columns, data = _a.data, setData = _a.setData, handleButtonClick = _a.handleButtonClick, disabledSort = _a.disabledSort;
    var _b = useTable({
        columns: columns,
        data: data,
        initialState: { hiddenColumns: ['id'] }
    }, useFilters, // useFilters!
    useGlobalFilter, useSortBy, usePagination), getTableProps = _b.getTableProps, getTableBodyProps = _b.getTableBodyProps, headerGroups = _b.headerGroups, rows = _b.rows, prepareRow = _b.prepareRow;
    var handleInputChange = function (event, row, columnId) {
        var newData = data.map(function (rowData) {
            var _a;
            if (rowData.id === row.original.id) {
                return __assign(__assign({}, rowData), (_a = {}, _a[columnId] = event.target.value, _a));
            }
            return rowData;
        });
        setData(newData);
    };
    var isEven = function (idx) { return idx % 2 === 0; };
    return (react_1["default"].createElement("div", { className: "py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 h-96 overflow-y-auto" },
        react_1["default"].createElement("div", { className: "shadow overflow-hidden border-b border-gray-200 sm:rounded-lg" },
            react_1["default"].createElement("table", __assign({}, getTableProps(), { className: "min-w-full divide-y divide-gray-200" }),
                react_1["default"].createElement("thead", null, headerGroups.map(function (headerGroup, key) { return (react_1["default"].createElement("tr", __assign({}, headerGroup.getHeaderGroupProps(), { key: key }), headerGroup.headers.map(function (column, i) { return (react_1["default"].createElement("th", __assign({ key: i }, column.getHeaderProps(column.getSortByToggleProps()), { className: "group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }),
                    react_1["default"].createElement("div", { className: "flex flex-row" },
                        column.render("Header"),
                        react_1["default"].createElement("span", null, column.isSorted
                            ? column.isSortedDesc
                                ? react_1["default"].createElement(Icons_1.SortDownIcon, { className: "w-4 h-4 text-gray-400" })
                                : react_1["default"].createElement(Icons_1.SortUpIcon, { className: "w-4 h-4 text-gray-400" })
                            : (react_1["default"].createElement(Icons_1.SortIcon, { className: "w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100" })))))); }))); })),
                react_1["default"].createElement("tbody", __assign({}, getTableBodyProps(), { className: "bg-white divide-y divide-gray-300 w-full" }), rows.map(function (row, i) {
                    prepareRow(row);
                    return (react_1["default"].createElement("tr", __assign({}, row.getRowProps(), { key: i, className: classnames_1["default"]('hover:bg-indigo-200 hover:bg-opacity-10', isEven(i) ? 'bg-gray-200 bg-opacity-25' : '') }), row.cells.map(function (cell, i) {
                        var _a, _b;
                        return (react_1["default"].createElement("td", __assign({ key: i }, cell.getCellProps(), { className: "px-6 py-4 whitespace-nowrap" }), ((_a = cell.column) === null || _a === void 0 ? void 0 : _a.editEnable) ? (((_b = row.original) === null || _b === void 0 ? void 0 : _b.isEditing) ? (react_1["default"].createElement("input", { type: "text", defaultValue: cell.value, onChange: function (e) {
                                return handleInputChange(e, row, cell.column.id);
                            }, className: classnames_1["default"]([
                                'relative inline-flex px-2 py-1 w-full rounded leading-none transition-colors ease-in-out placeholder-gray-500 text-gray-700 border border-gray-300 hover:border-blue-400 focus:outline-none focus:border-blue-400 focus:ring-blue-400 focus:ring-4 focus:ring-opacity-30',
                            ]) })) : (cell.render("Cell"))) : (cell.render("Cell"))));
                    })));
                }))))));
};
exports["default"] = EditableTable;
