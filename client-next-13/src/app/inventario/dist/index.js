"use strict";
exports.__esModule = true;
var react_1 = require("react");
var withAuthentication_1 = require("src/components/withAuthentication");
var Index_1 = require("src/components/inventario/Index");
var AuthContext_1 = require("contexts/AuthContext");
var hooks_1 = require("store/hooks");
var router_1 = require("next/router");
var InventarioIndex = function () {
    var client = react_1.useContext(AuthContext_1.AuthContext).client;
    var dispatch = hooks_1.useAppDispatch();
    var router = router_1.useRouter();
    return (React.createElement(React.Fragment, null,
        React.createElement(Index_1["default"], null)));
};
exports["default"] = withAuthentication_1["default"](InventarioIndex);
