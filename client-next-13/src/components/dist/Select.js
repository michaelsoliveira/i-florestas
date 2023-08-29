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
exports.Select = void 0;
var react_1 = require("react");
var async_1 = require("react-select/async");
exports.Select = function (_a) {
    var label = _a.label, callback = _a.callback, options = _a.options, defaultOptions = _a.defaultOptions, placeholder = _a.placeholder, selectedValue = _a.selectedValue, _b = _a.isMulti, isMulti = _b === void 0 ? false : _b, initialData = _a.initialData;
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("label", { className: "text-sm", htmlFor: "" }, label),
        react_1["default"].createElement(async_1["default"], { isMulti: isMulti, loadOptions: options, className: "text-sm origin-top-right absolute right-0", defaultOptions: defaultOptions, placeholder: placeholder, value: typeof selectedValue !== typeof undefined ? ((selectedValue === null || selectedValue === void 0 ? void 0 : selectedValue.length) > 1 ? selectedValue === null || selectedValue === void 0 ? void 0 : selectedValue.map(function (data) {
                return {
                    label: data.label,
                    value: data.value
                };
            }) :
                selectedValue) : initialData, onChange: callback, id: "category-select", instanceId: "category-select", theme: function (theme) { return (__assign(__assign({}, theme), { 
                // borderRadius: 0,
                colors: __assign(__assign({}, theme.colors), { primary: 'rgb(21 128 61)', primary75: 'rgb(22 163 74)', primary50: 'rgb(21 128 61)', primary25: 'rgb(229 231 235)' }) })); } })));
};
