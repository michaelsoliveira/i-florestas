'use client';
"use strict";
exports.__esModule = true;
exports.Loading = void 0;
var LoadingContext_1 = require("@/context/LoadingContext");
var react_1 = require("react");
exports.Loading = function () {
    var loading = react_1.useContext(LoadingContext_1.LoadingContext).loading;
    return (React.createElement("div", { className: "" }, loading && (React.createElement("div", { className: "absolute bg-white bg-opacity-60 z-30 h-full w-full flex items-center justify-center" },
        React.createElement("div", { className: "flex items-center" },
            React.createElement("div", { "aria-label": "Loading...", role: "status" },
                React.createElement("svg", { className: "h-10 w-10 animate-spin stroke-indigo-500", viewBox: "0 0 256 256" },
                    React.createElement("line", { x1: "128", y1: "32", x2: "128", y2: "64", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "24" }),
                    React.createElement("line", { x1: "195.9", y1: "60.1", x2: "173.3", y2: "82.7", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "24" }),
                    React.createElement("line", { x1: "224", y1: "128", x2: "192", y2: "128", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "24" }),
                    React.createElement("line", { x1: "195.9", y1: "195.9", x2: "173.3", y2: "173.3", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "24" }),
                    React.createElement("line", { x1: "128", y1: "224", x2: "128", y2: "192", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "24" }),
                    React.createElement("line", { x1: "60.1", y1: "195.9", x2: "82.7", y2: "173.3", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "24" }),
                    React.createElement("line", { x1: "32", y1: "128", x2: "64", y2: "128", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "24" }),
                    React.createElement("line", { x1: "60.1", y1: "60.1", x2: "82.7", y2: "82.7", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "24" }))))))));
};
exports["default"] = exports.Loading;
