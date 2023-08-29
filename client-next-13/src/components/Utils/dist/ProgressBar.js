'use client';
"use strict";
exports.__esModule = true;
var ProgressBar = function (_a) {
    var completed = _a.completed;
    return (React.createElement("div", { className: 'h-1 w-full bg-gray-300' },
        React.createElement("div", { style: { width: completed + "%" }, className: "h-full " + (completed < 70 ? 'bg-orange-600' : 'bg-green-600') })));
};
exports["default"] = ProgressBar;
