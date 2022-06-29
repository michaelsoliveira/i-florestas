"use strict";
exports.__esModule = true;
var ChangePassword_1 = require("components/user/ChangePassword");
var withAuthentication_1 = require("components/withAuthentication");
var ChangePasswordPage = function () {
    return (React.createElement("div", null,
        React.createElement(ChangePassword_1.ChangePassword, null)));
};
exports["default"] = withAuthentication_1["default"](ChangePasswordPage);
