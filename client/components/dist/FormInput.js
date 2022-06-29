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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.FormInput = void 0;
var react_1 = require("react");
var classnames_1 = require("classnames");
var lodash_get_1 = require("lodash.get");
var error_message_1 = require("@hookform/error-message");
var input_1 = require("./atoms/input");
var form_error_message_1 = require("./atoms/form-error-message");
exports.FormInput = function (_a) {
    var label = _a.label, name = _a.name, register = _a.register, rules = _a.rules, errors = _a.errors, className = _a.className, _b = _a.layout, layout = _b === void 0 ? 'default' : _b, innerRef = _a.innerRef, props = __rest(_a, ["label", "name", "register", "rules", "errors", "className", "layout", "innerRef"]);
    // If the name is in a FieldArray, it will be 'fields.index.fieldName' and errors[name] won't return anything, so we are using lodash get
    var errorMessages = lodash_get_1["default"](errors, name);
    var hasError = !!(errors && errorMessages);
    var inputRef = react_1.useRef(null);
    return (react_1["default"].createElement("div", { className: classnames_1["default"]('', className), "aria-live": "polite" },
        react_1["default"].createElement("label", { htmlFor: label, className: 'text-primary placeholder-gray-gray4 pt-1.5' },
            label,
            " ",
            (rules === null || rules === void 0 ? void 0 : rules.required) && react_1["default"].createElement("span", { className: 'text-red' }, "*")),
        react_1["default"].createElement(input_1.Input, __assign({ label: label, name: name, "aria-invalid": hasError, ref: innerRef, className: classnames_1["default"]({
                'transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50 border-red-600 hover:border-red-600 focus:border-red-600 focus:ring-red-600': hasError
            }) }, props, (register && register(name, rules)))),
        react_1["default"].createElement(error_message_1.ErrorMessage, { errors: errors, name: name, render: function (_a) {
                var message = _a.message;
                return (react_1["default"].createElement(form_error_message_1.FormErrorMessage, { className: "mt-1" }, message));
            } })));
};
