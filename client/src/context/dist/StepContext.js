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
exports.StepProvider = exports.StepContext = void 0;
var react_1 = require("react");
var StepContext = react_1.createContext({ step: 1 });
exports.StepContext = StepContext;
var StepProvider = function (_a) {
    var children = _a.children;
    var _b = react_1.useState(1), step = _b[0], setStep = _b[1];
    var _c = react_1.useState({}), data = _c[0], setData = _c[1];
    var nextStep = function () {
        setStep(function (prevStep) { return prevStep + 1; });
    };
    var prevStep = function () {
        setStep(function (prevStep) { return prevStep - 1; });
    };
    var updateData = function (data) {
        setData(function (prevData) { return (__assign(__assign({}, prevData), data)); });
    };
    var resetData = function () {
        setData({});
        setStep(1);
    };
    var values = {
        step: step,
        data: data,
        nextStep: nextStep,
        prevStep: prevStep,
        updateData: updateData,
        resetData: resetData,
        setStep: setStep
    };
    return (react_1["default"].createElement(StepContext.Provider, { value: values }, children));
};
exports.StepProvider = StepProvider;
