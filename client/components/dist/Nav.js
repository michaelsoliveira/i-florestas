"use strict";
exports.__esModule = true;
exports.Nav = void 0;
var react_1 = require("react");
var NavLink_1 = require("./NavLink");
var services_1 = require("services");
function Nav() {
    var _a = react_1.useState(null), user = _a[0], setUser = _a[1];
    react_1.useEffect(function () {
        var subscription = services_1.userService.user.subscribe(function (x) { return setUser(x); });
        return function () { return subscription.unsubscribe(); };
    }, []);
    function logout() {
        services_1.userService.logout();
    }
    // only show nav when logged in
    if (!user)
        return null;
    return (React.createElement("nav", { className: "navbar navbar-expand navbar-dark bg-dark" },
        React.createElement("div", { className: "navbar-nav" },
            React.createElement(NavLink_1.NavLink, { href: "/", exact: true, className: "nav-item nav-link" }, "Home"),
            React.createElement("a", { onClick: logout, className: "nav-item nav-link" }, "Logout"))));
}
exports.Nav = Nav;
