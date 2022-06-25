"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
require("../styles/globals.css");
require("react-toastify/dist/ReactToastify.css");
var AuthContext_1 = require("../contexts/AuthContext");
var react_redux_1 = require("react-redux");
var store_1 = require("../store");
var browser_storage_1 = require("../store/browser-storage");
var Layout_1 = require("../components/Layout");
var react_toastify_1 = require("react-toastify");
var react_1 = require("next-auth/react");
var debounce_1 = require("debounce");
function MyApp(_a) {
    var Component = _a.Component, _b = _a.pageProps, session = _b.session, pageProps = __rest(_b, ["session"]);
    store_1.store.subscribe(
    // we use debounce to save the state once each 800ms
    // for better performances in case multiple changes occur in a short time
    debounce_1.debounce(function () {
        browser_storage_1.saveState(store_1.store.getState());
    }, 800));
    return (React.createElement(react_1.SessionProvider, { session: session },
        React.createElement(react_redux_1.Provider, { store: store_1.store },
            React.createElement(AuthContext_1.AuthProvider, null,
                React.createElement(Layout_1["default"], null,
                    React.createElement(react_toastify_1.ToastContainer, null),
                    React.createElement(Component, __assign({}, pageProps)))))));
}
exports["default"] = MyApp;
