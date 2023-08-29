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
var react_1 = require("react");
var Export = function () {
    var data = [
        { id: "1", name: 'michael', email: 'fdgsadgf@rrr.com' },
        { id: "2", name: 'ertyerty', email: 'gfhmndnh@rrr.com' },
        { id: "3", name: 'ukjertywrty', email: 'nghnfdx@rrr.com' },
        { id: "4", name: 'nbveehgj', email: 'sdfg@rrr.com' },
        { id: "5", name: 'wrt6yjhfd', email: 'xcvbcx@rrr.com' },
        { id: "6", name: 'netwrtiwe', email: 'mthnew@rrr.com' },
        { id: "7", name: 'ujndsfgjeds', email: 'jtergfbw@rrr.com' },
        { id: "8", name: 'zdgjherthert', email: 'kiuteh@rrr.com' },
    ];
    var itemsPerPage = 2;
    var _a = react_1.useState(1), currentPage = _a[0], setCurrentPage = _a[1];
    var _b = react_1.useState(data), filteredData = _b[0], setFilteredData = _b[1];
    var _c = react_1.useState({
        key: null,
        direction: null
    }), sortConfig = _c[0], setSortConfig = _c[1];
    // Function to handle pagination
    var handlePageChange = function (pageNumber) {
        setCurrentPage(pageNumber);
    };
    // Function to handle filtering
    var handleFilter = function (searchTerm) {
        var filteredResults = data.filter(function (item) {
            return Object.values(item).some(function (value) {
                return String(value).toLowerCase().includes(searchTerm.toLowerCase());
            });
        });
        setFilteredData(filteredResults);
    };
    // Function to handle sorting
    var handleSort = function (key) {
        var direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key: key, direction: direction });
        var sortedData = __spreadArrays(filteredData).sort(function (a, b) {
            var aValue = a[key];
            var bValue = b[key];
            if (direction === 'asc') {
                return aValue === null || aValue === void 0 ? void 0 : aValue.localeCompare(bValue);
            }
            else {
                return bValue === null || bValue === void 0 ? void 0 : bValue.localeCompare(aValue);
            }
        });
        setFilteredData(sortedData);
    };
    // Calculate pagination boundaries
    var lastIndex = currentPage * itemsPerPage;
    var firstIndex = lastIndex - itemsPerPage;
    var currentData = filteredData.slice(firstIndex, lastIndex);
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("input", { type: "text", placeholder: "Search...", onChange: function (e) { return handleFilter(e.target.value); } }),
        react_1["default"].createElement("table", null,
            react_1["default"].createElement("thead", null,
                react_1["default"].createElement("tr", null,
                    react_1["default"].createElement("th", { onClick: function () { return handleSort('id'); } }, "ID"),
                    react_1["default"].createElement("th", { onClick: function () { return handleSort('name'); } }, "Name"),
                    react_1["default"].createElement("th", { onClick: function () { return handleSort('email'); } }, "Email"))),
            react_1["default"].createElement("tbody", null, currentData.map(function (item) { return (react_1["default"].createElement("tr", { key: item.id },
                react_1["default"].createElement("td", null, item.id),
                react_1["default"].createElement("td", null, item.name),
                react_1["default"].createElement("td", null, item.email))); }))),
        react_1["default"].createElement("div", null, Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }).map(function (_, index) { return (react_1["default"].createElement("button", { key: index, onClick: function () { return handlePageChange(index + 1); } }, index + 1)); }))));
};
exports["default"] = Export;
