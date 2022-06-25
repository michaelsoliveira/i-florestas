"use strict";
exports.__esModule = true;
exports.LinkBack = void 0;
var Link_1 = require("./Link");
exports.LinkBack = function (_a) {
    var href = _a.href, className = _a.className;
    return (React.createElement("div", null,
        React.createElement(Link_1.Link, { href: href, className: className },
            React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
                React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M10 19l-7-7m0 0l7-7m-7 7h18" })))));
};
