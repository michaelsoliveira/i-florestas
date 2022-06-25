"use strict";
exports.__esModule = true;
/* eslint-disable @next/next/link-passhref */
var react_1 = require("react");
// import styled from 'styled-components';
// import Link from 'next/link';
var FaIcons = require("react-icons/fa");
var AiIcons = require("react-icons/ai");
var SidebarData_1 = require("./SidebarData");
var SubMenu_1 = require("./SubMenu");
var lib_1 = require("react-icons/lib");
var Sidebar_module_css_1 = require("../styles/Sidebar.module.css");
var Link_1 = require("./Link");
var Sidebar = function () {
    var _a = react_1.useState(false), sidebar = _a[0], setSidebar = _a[1];
    var showSidebar = function () { return setSidebar(!sidebar); };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(lib_1.IconContext.Provider, { value: { color: '#fff' } },
            react_1["default"].createElement("nav", { className: "nav" },
                react_1["default"].createElement(Link_1.Link, { href: "#" },
                    react_1["default"].createElement(FaIcons.FaBars, { className: Sidebar_module_css_1["default"].nav__icon, onClick: showSidebar }))),
            react_1["default"].createElement("div", { className: (sidebar ? Sidebar_module_css_1["default"].sidebar__nav + " " + Sidebar_module_css_1["default"].left_on : Sidebar_module_css_1["default"].sidebar__nav + " " + Sidebar_module_css_1["default"].left_off) },
                react_1["default"].createElement("div", { style: { width: "100%" } },
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement(AiIcons.AiOutlineClose, { className: Sidebar_module_css_1["default"].nav__icon, onClick: showSidebar })),
                    SidebarData_1.SidebarData.map(function (item, index) {
                        return react_1["default"].createElement(SubMenu_1["default"], { item: item, key: index });
                    }))))));
};
exports["default"] = Sidebar;
