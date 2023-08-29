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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.AvatarCell = exports.StatusPill = exports.SelectColumnFilter = void 0;
var react_1 = require("react");
var solid_1 = require("@heroicons/react/solid");
var Button_1 = require("./Utils/Button");
var classNames_1 = require("./Utils/classNames");
var Icons_1 = require("./Utils/Icons");
var image_1 = require("next/image");
var ModalContext_1 = require("@/context/ModalContext");
var _a = require('react-table'), useTable = _a.useTable, useFilters = _a.useFilters, useGlobalFilter = _a.useGlobalFilter, useAsyncDebounce = _a.useAsyncDebounce, useSortBy = _a.useSortBy, usePagination = _a.usePagination;
var sizeMap = {
    small: 'p-2 text-sm',
    medium: 'p-3 text-base',
    large: 'p-4 text-base'
};
// Define a default UI for filtering
function GlobalFilter(_a) {
    var preGlobalFilteredRows = _a.preGlobalFilteredRows, globalFilter = _a.globalFilter, setGlobalFilter = _a.setGlobalFilter, _b = _a.size, size = _b === void 0 ? 'small' : _b, inputSize = _a.inputSize;
    var count = preGlobalFilteredRows.length;
    var _c = react_1.useState(globalFilter), value = _c[0], setValue = _c[1];
    var onChange = useAsyncDebounce(function (value) {
        setGlobalFilter(value || undefined);
    }, 200);
    return (react_1["default"].createElement("label", { className: "flex gap-x-2 items-baseline px-2" },
        react_1["default"].createElement("span", { className: "text-gray-800" }, "Pesquisar: "),
        react_1["default"].createElement("div", { className: inputSize },
            react_1["default"].createElement("input", { type: "text", className: classNames_1["default"]("relative inline-flex w-full rounded leading-none transition-colors ease-in-out placeholder-gray-500 text-gray-700 border border-gray-300 hover:border-blue-400 focus:outline-none focus:border-blue-400 focus:ring-blue-400 focus:ring-4 focus:ring-opacity-30 p-[.3rem]", sizeMap[size]), value: value || "", onChange: function (e) {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }, placeholder: count + " registros..." }))));
}
// This is a custom filter UI for selecting
// a unique option from a list
function SelectColumnFilter(_a) {
    var _b = _a.column, filterValue = _b.filterValue, setFilter = _b.setFilter, preFilteredRows = _b.preFilteredRows, id = _b.id, render = _b.render;
    // Calculate the options for filtering
    // using the preFilteredRows
    var options = react_1.useMemo(function () {
        var options = new Set();
        preFilteredRows.forEach(function (row) {
            options.add(row.values[id]);
        });
        return __spreadArrays(options.values());
    }, [id, preFilteredRows]);
    // Render a multi-select box
    return (react_1["default"].createElement("div", { className: "flex gap-x-2 items-baseline px-2" },
        react_1["default"].createElement("span", { className: "text-gray-700" },
            render("Header"),
            ": "),
        react_1["default"].createElement("select", { className: "rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-1", name: id, id: id, value: filterValue, onChange: function (e) {
                setFilter(e.target.value || undefined);
            } },
            react_1["default"].createElement("option", { value: "" }, "Todos"),
            options.map(function (option, i) { return (react_1["default"].createElement("option", { key: i, value: option }, option)); }))));
}
exports.SelectColumnFilter = SelectColumnFilter;
function StatusPill(_a) {
    var value = _a.value;
    var status = value ? value.toLowerCase() : "unknown";
    return (react_1["default"].createElement("span", { className: classNames_1["default"]("px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm", status.startsWith("active") ? "bg-green-100 text-green-800" : null, status.startsWith("inactive") ? "bg-yellow-100 text-yellow-800" : null, status.startsWith("offline") ? "bg-red-100 text-red-800" : null) }, status));
}
exports.StatusPill = StatusPill;
;
function AvatarCell(_a) {
    var value = _a.value, column = _a.column, row = _a.row;
    return (react_1["default"].createElement("div", { className: "flex items-center" },
        react_1["default"].createElement("div", { className: "flex-shrink-0 h-10 w-10" },
            react_1["default"].createElement(image_1["default"], { width: "50", height: "50", className: "h-10 w-10 rounded-full", src: row.original[column.imgAccessor], alt: "" })),
        react_1["default"].createElement("div", { className: "ml-4" },
            react_1["default"].createElement("div", { className: "text-sm font-medium text-gray-900" }, value),
            react_1["default"].createElement("div", { className: "text-sm text-gray-500" }, row.original[column.emailAccessor]))));
}
exports.AvatarCell = AvatarCell;
function Table(_a) {
    var columns = _a.columns, data = _a.data, size = _a.size, inputSize = _a.inputSize;
    // Use the state and functions returned from useTable to build your UI
    var _b = useTable({
        columns: columns,
        data: data
    }, useFilters, // useFilters!
    useGlobalFilter, useSortBy, usePagination), getTableProps = _b.getTableProps, getTableBodyProps = _b.getTableBodyProps, headerGroups = _b.headerGroups, prepareRow = _b.prepareRow, page = _b.page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page
    // The rest of these things are super handy, too ;)
    canPreviousPage = _b.canPreviousPage, canNextPage = _b.canNextPage, pageOptions = _b.pageOptions, pageCount = _b.pageCount, gotoPage = _b.gotoPage, nextPage = _b.nextPage, previousPage = _b.previousPage, setPageSize = _b.setPageSize, state = _b.state, preGlobalFilteredRows = _b.preGlobalFilteredRows, setGlobalFilter = _b.setGlobalFilter;
    var isEven = function (idx) { return idx % 2 === 0; };
    var store = ModalContext_1.useModalContext().store;
    var visible = store.visible;
    // Render the UI for your table
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { className: "sm:flex sm:gap-x-2" },
            react_1["default"].createElement(GlobalFilter, { preGlobalFilteredRows: preGlobalFilteredRows, globalFilter: state.globalFilter, setGlobalFilter: setGlobalFilter, size: size, inputSize: inputSize }),
            headerGroups.map(function (headerGroup) {
                return headerGroup.headers.map(function (column) {
                    return column.Filter ? (react_1["default"].createElement("div", { className: "mt-2 sm:mt-0", key: column.id }, column.render("Filter"))) : null;
                });
            })),
        react_1["default"].createElement("div", { className: "mt-4 flex flex-col" },
            react_1["default"].createElement("div", { className: "-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-6" },
                react_1["default"].createElement("div", { className: "py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8" },
                    react_1["default"].createElement("div", { className: classNames_1["default"]("shadow overflow-hidden border-b border-gray-200 sm:rounded-lg", visible && "overflow-y-auto max-h-80") },
                        react_1["default"].createElement("table", __assign({}, getTableProps(), { className: "min-w-full divide-y divide-gray-200" }),
                            react_1["default"].createElement("thead", { className: "bg-gray-50 w-full sticky top-0" }, headerGroups.map(function (headerGroup, key) { return (react_1["default"].createElement("tr", __assign({}, headerGroup.getHeaderGroupProps(), { key: key }), headerGroup.headers.map(function (column, i) { return (
                            // Add the sorting props to control sorting. For this example
                            // we can add them into the header props
                            react_1["default"].createElement("th", __assign({ scope: "col", className: "group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, column.getHeaderProps(column.getSortByToggleProps()), { key: i }),
                                react_1["default"].createElement("div", { className: "flex items-center justify-between" },
                                    column.render('Header'),
                                    react_1["default"].createElement("span", null, column.isSorted
                                        ? column.isSortedDesc
                                            ? react_1["default"].createElement(Icons_1.SortDownIcon, { className: "w-4 h-4 text-gray-400" })
                                            : react_1["default"].createElement(Icons_1.SortUpIcon, { className: "w-4 h-4 text-gray-400" })
                                        : (react_1["default"].createElement(Icons_1.SortIcon, { className: "w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100" })))))); }))); })),
                            react_1["default"].createElement("tbody", __assign({}, getTableBodyProps(), { className: "bg-white divide-y divide-gray-200" }), page.map(function (row, i) {
                                prepareRow(row);
                                return (react_1["default"].createElement("tr", __assign({}, row.getRowProps(), { key: i, className: classNames_1["default"]('hover:bg-indigo-200 hover:bg-opacity-10', isEven(i) ? 'bg-gray-200 bg-opacity-10' : '') }), row.cells.map(function (cell, key) {
                                    return (react_1["default"].createElement("td", __assign({}, cell.getCellProps(), { className: "px-6 py-4 whitespace-nowrap", role: "cell", key: key }), cell.column.Cell.name === "defaultRenderer"
                                        ? react_1["default"].createElement("div", { className: "text-sm text-gray-500" }, cell.render('Cell'))
                                        : cell.render('Cell')));
                                })));
                            }))))))),
        /* Pagination */
        ((data === null || data === void 0 ? void 0 : data.length) > 0) && (react_1["default"].createElement("div", { className: "py-3 flex items-center justify-between" },
            react_1["default"].createElement("div", { className: "flex-1 flex justify-between sm:hidden" },
                react_1["default"].createElement(Button_1.Button, { onClick: function () { return previousPage(); }, disabled: !canPreviousPage }, "Anterior"),
                react_1["default"].createElement(Button_1.Button, { onClick: function () { return nextPage(); }, disabled: !canNextPage }, "Pr\u00F3ximo")),
            react_1["default"].createElement("div", { className: "hidden sm:flex-1 sm:flex sm:items-center sm:justify-between" },
                react_1["default"].createElement("div", { className: "flex gap-x-2 items-baseline" },
                    react_1["default"].createElement("span", { className: "text-sm text-gray-700" },
                        "P\u00E1gina ",
                        react_1["default"].createElement("span", { className: "font-medium" }, state.pageIndex + 1),
                        " de ",
                        react_1["default"].createElement("span", { className: "font-medium" }, pageOptions.length)),
                    react_1["default"].createElement("div", { className: 'inline-flex items-baseline text-sm' },
                        react_1["default"].createElement("span", { className: 'w-36 font-medium' }, "por P\u00E1gina"),
                        react_1["default"].createElement("select", { className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-1", value: state.pageSize, onChange: function (e) {
                                setPageSize(Number(e.target.value));
                            } }, [5, 10, 20].map(function (pageSize) { return (react_1["default"].createElement("option", { key: pageSize, value: pageSize }, pageSize)); })))),
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement("nav", { className: "relative z-0 inline-flex rounded-md shadow-sm -space-x-px", "aria-label": "Pagination" },
                        react_1["default"].createElement(Button_1.PageButton, { className: "rounded-l-md", onClick: function () { return gotoPage(0); }, disabled: !canPreviousPage },
                            react_1["default"].createElement("span", { className: "sr-only" }, "Primeiro"),
                            react_1["default"].createElement(solid_1.ChevronDoubleLeftIcon, { className: "h-5 w-5 text-gray-400", "aria-hidden": "true" })),
                        react_1["default"].createElement(Button_1.PageButton, { onClick: function () { return previousPage(); }, disabled: !canPreviousPage },
                            react_1["default"].createElement("span", { className: "sr-only" }, "Anterior"),
                            react_1["default"].createElement(solid_1.ChevronLeftIcon, { className: "h-5 w-5 text-gray-400", "aria-hidden": "true" })),
                        react_1["default"].createElement(Button_1.PageButton, { onClick: function () { return nextPage(); }, disabled: !canNextPage },
                            react_1["default"].createElement("span", { className: "sr-only" }, "Pr\u00F3ximo"),
                            react_1["default"].createElement(solid_1.ChevronRightIcon, { className: "h-5 w-5 text-gray-400", "aria-hidden": "true" })),
                        react_1["default"].createElement(Button_1.PageButton, { className: "rounded-r-md", onClick: function () { return gotoPage(pageCount - 1); }, disabled: !canNextPage },
                            react_1["default"].createElement("span", { className: "sr-only" }, "\u00DAltimo"),
                            react_1["default"].createElement(solid_1.ChevronDoubleRightIcon, { className: "h-5 w-5 text-gray-400", "aria-hidden": "true" })))))))));
}
exports["default"] = Table;
