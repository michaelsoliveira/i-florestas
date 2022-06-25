"use strict";
exports.__esModule = true;
/* eslint-disable @next/next/link-passhref */
var react_1 = require("react");
function Navbar() {
    var _a = react_1.useState(false), sidebar = _a[0], setSidebar = _a[1];
    var showSidebar = function () { return setSidebar(!sidebar); };
    var handleSideBar = function () {
        setSidebar(!sidebar);
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { className: "relative min-h-screen md:flex" },
            react_1["default"].createElement("div", { className: "bg-gray-100 text-gray-700 flex justify-between md:hidden" },
                react_1["default"].createElement("a", { href: "#", className: "block p-4 text-gray-800 font-bold" }, "BOManejo"),
                react_1["default"].createElement("button", { className: "mobile-menu-button p-4 focus:outline-none focus:bg-gray-200", onClick: handleSideBar },
                    react_1["default"].createElement("svg", { className: "h-5 w-5", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
                        react_1["default"].createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 6h16M4 12h16M4 18h16" })))),
            react_1["default"].createElement("div", { className: sidebar ? 'bg-gray-100 text-green-800 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 -translate-x-full transform md:relative md:translate-x-0 transition duration-200 ease-in-out' : 'bg-gray-100 text-green-800 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform md:relative md:translate-x-0 transition duration-200 ease-in-out' },
                react_1["default"].createElement("a", { href: "#", className: "text-green-600 flex items-center space-x-2 px-4" },
                    react_1["default"].createElement("svg", { className: "w-8 h-8", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
                        react_1["default"].createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" })),
                    react_1["default"].createElement("span", { className: "text-2xl font-extrabold" }, "BOManejo")),
                react_1["default"].createElement("nav", null,
                    react_1["default"].createElement("a", { href: "#", className: "block py-2.5 px-4 rounded transition duration-200 hover:bg-green-700 hover:text-white" }, "Home"),
                    react_1["default"].createElement("a", { href: "", className: "block py-2.5 px-4 rounded transition duration-200 hover:bg-green-700 hover:text-white" }, "About"),
                    react_1["default"].createElement("a", { href: "", className: "block py-2.5 px-4 rounded transition duration-200 hover:bg-green-700 hover:text-white" }, "Features"),
                    react_1["default"].createElement("a", { href: "", className: "block py-2.5 px-4 rounded transition duration-200 hover:bg-green-700 hover:text-white" }, "Pricing"))),
            react_1["default"].createElement("div", { className: "flex-1 p-10 text-2xl font-bold" }, "content goes here"))));
}
exports["default"] = Navbar;
