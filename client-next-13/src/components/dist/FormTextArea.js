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
exports.FormTextarea = void 0;
var react_1 = require("react");
var classnames_1 = require("classnames");
var lodash_1 = require("lodash");
var error_message_1 = require("@hookform/error-message");
var form_error_message_1 = require("./atoms/form-error-message");
exports.FormTextarea = function (_a) {
    var id = _a.id, name = _a.name, label = _a.label, register = _a.register, rules = _a.rules, errors = _a.errors, className = _a.className, props = __rest(_a, ["id", "name", "label", "register", "rules", "errors", "className"]);
    // If the name is in a FieldArray, it will be 'fields.index.fieldName' and errors[name] won't return anything, so we are using lodash get
    var errorMessages = lodash_1["default"].get(errors, name);
    var hasError = !!(errors && errorMessages);
    return (react_1["default"].createElement("div", { className: className },
        react_1["default"].createElement("label", { htmlFor: label, className: 'text-primary placeholder-gray-gray4 pt-1.5' },
            label,
            " ",
            (rules === null || rules === void 0 ? void 0 : rules.required) && react_1["default"].createElement("span", { className: 'text-red' }, "*")),
        react_1["default"].createElement("textarea", __assign({ id: id, name: name, "aria-label": label, "aria-invalid": !!(errors && errorMessages), className: classnames_1["default"]('block w-full appearance-none relative p-3 text-base rounded leading-none transition-colors ease-in-out placeholder-gray-500 text-gray-700 bg-gray-50 border border-gray-300 hover:border-blue-400 focus:outline-none focus:border-blue-400 focus:ring-blue-400 focus:ring-4 focus:ring-opacity-30 overflow-auto resize-none', hasError
                ? 'focus:outline-none focus:ring-2 focus:ring-opacity-50 border-red-600 hover:border-red-600 focus:border-red-600 focus:ring-red-600'
                : '') }, props, (register && register(name, rules)))),
        react_1["default"].createElement(error_message_1.ErrorMessage, { errors: errors, name: name, render: function (_a) {
                var message = _a.message;
                return react_1["default"].createElement(form_error_message_1.FormErrorMessage, null, message);
            } })));
};
