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
    var label = _a.label, callback = _a.callback, options = _a.options, defaultOptions = _a.defaultOptions, initialData = _a.initialData, selectedValue = _a.selectedValue;
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("label", { htmlFor: "" }, label),
        react_1["default"].createElement(async_1["default"], { cacheOptions: true, loadOptions: options, defaultOptions: defaultOptions, value: typeof (selectedValue === null || selectedValue === void 0 ? void 0 : selectedValue.value) !== typeof undefined ? selectedValue : initialData, onChange: callback, id: "category-select", instanceId: "category-select", theme: function (theme) { return (__assign(__assign({}, theme), { 
                // borderRadius: 0,
                colors: __assign(__assign({}, theme.colors), { primary: 'rgb(21 128 61)', primary75: 'rgb(22 163 74)', primary50: 'rgb(21 128 61)', primary25: 'rgb(229 231 235)' }) })); } })));
};
