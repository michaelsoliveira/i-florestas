"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Link_1 = require("./Link");
var SubMenu_module_css_1 = require("../styles/SubMenu.module.css");
var SubMenu = function (_a) {
    var item = _a.item;
    var _b = react_1.useState(false), subnav = _b[0], setSubnav = _b[1];
    var showSubnav = function () { return setSubnav(!subnav); };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(Link_1.Link, { className: SubMenu_module_css_1["default"].sidebar__link, href: item.path, onClick: item.subNav && showSubnav },
            react_1["default"].createElement("div", null,
                item.icon,
                react_1["default"].createElement("label", { className: SubMenu_module_css_1["default"].sidebar__label }, item.title)),
            react_1["default"].createElement("div", null, item.subNav && subnav
                ? item.iconOpened
                : item.subNav
                    ? item.iconClosed
                    : null)),
        subnav &&
            item.subNav.map(function (item, index) {
                return (react_1["default"].createElement(Link_1.Link, { href: item.path, key: index },
                    item.icon,
                    react_1["default"].createElement("label", { className: SubMenu_module_css_1["default"].sidebar__label }, item.title)));
            })));
};
exports["default"] = SubMenu;
