"use strict";
exports.__esModule = true;
exports.NavLink = void 0;
var router_1 = require("next/router");
// import PropTypes from 'prop-types';
var react_1 = require("react");
var Link_1 = require("./Link");
var NavLink = function (_a) {
    var href = _a.href, exact = _a.exact, className = _a.className, children = _a.children;
    var pathname = router_1.useRouter().pathname;
    var isActive = exact ? pathname === href : pathname.startsWith(href);
    if (isActive) {
        className += ' active';
    }
    return react_1["default"].createElement(Link_1.Link, { href: href }, children);
};
exports.NavLink = NavLink;
