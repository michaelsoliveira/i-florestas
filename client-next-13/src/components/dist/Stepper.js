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
var react_1 = require("react");
var Stepper = function (_a) {
    var steps = _a.steps, currentStep = _a.currentStep;
    var _b = react_1.useState([]), stepperSteps = _b[0], setStep = _b[1];
    var stepsStateRef = react_1.useRef();
    react_1.useEffect(function () {
        var stepsState = steps.map(function (step, index) {
            var stepObj = {};
            stepObj.description = step;
            stepObj.completed = false;
            stepObj.highlighted = index === 0 ? true : false;
            stepObj.selected = index === 0 ? true : false;
            return stepObj;
        });
        stepsStateRef.current = stepsState;
        var currentSteps = updateStep(currentStep - 1, stepsState);
        setStep(currentSteps);
    }, [currentStep, steps]);
    react_1.useEffect(function () {
        var currentSteps = updateStep(currentStep - 1, stepsStateRef.current);
        setStep(currentSteps);
    }, [currentStep]);
    function updateStep(stepNumber, steps) {
        var newSteps = __spreadArrays(steps);
        var stepCounter = 0;
        while (stepCounter < newSteps.length) {
            //current step 
            if (stepCounter === stepNumber) {
                newSteps[stepCounter] = __assign(__assign({}, newSteps[stepCounter]), { highlighted: true, selected: true, completed: false });
                stepCounter++;
            }
            // Past step
            else if (stepCounter < stepNumber) {
                newSteps[stepCounter] = __assign(__assign({}, newSteps[stepCounter]), { highlighted: false, selected: true, completed: true });
                stepCounter++;
            }
            // Future steps 
            else {
                newSteps[stepCounter] = __assign(__assign({}, newSteps[stepCounter]), { highlighted: false, selected: false, completed: false });
                stepCounter++;
            }
        }
        return newSteps;
    }
    var stepsDisplay = stepperSteps.map(function (step, index) {
        return (react_1["default"].createElement("div", { key: index, className: index !== stepperSteps.length - 1 ? "w-full flex items-center" : "flex items-center" },
            react_1["default"].createElement("div", { className: "relative flex flex-col items-center text-teal-600 px-4" },
                react_1["default"].createElement("div", { className: "rounded-full transition duration-500 ease-in-out border-2 border-gray-300 h-12 w-12 flex items-center justify-center py-3  " + (step.selected ? "bg-green-600 text-white font-bold" : "") }, step.completed ? react_1["default"].createElement("span", { className: "text-white font-bold text-xl" }, "\u2713") : index + 1),
                react_1["default"].createElement("div", { className: "absolute top-0  text-center mt-16 w-32 text-xs font-medium uppercase " + (step.highlighted ? "text-gray-900" : "text-gray-400") },
                    " ",
                    step.description,
                    "\t")),
            react_1["default"].createElement("div", { className: "flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300 " }, " ")));
    });
    return (react_1["default"].createElement("div", { className: "mx-4 p-4 flex justify-between items-center" }, stepsDisplay));
};
exports["default"] = Stepper;
