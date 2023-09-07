'use client';
"use strict";
exports.__esModule = true;
require("@/app/globals.css");
require("react-toastify/dist/ReactToastify.css");
var AuthContext_1 = require("@/context/AuthContext");
var ProjetoContext_1 = require("@/context/ProjetoContext");
var ModalContext_1 = require("@/context/ModalContext");
var LoadingContext_1 = require("@/context/LoadingContext");
var StepContext_1 = require("@/context/StepContext");
// import { Provider } from 'react-redux'
var store_1 = require("@/redux/store");
var browser_storage_1 = require("@/redux/browser-storage");
var Layout_1 = require("@/components/Layout");
// import { SessionProvider } from 'next-auth/react'
var Modal_1 = require("@/components/Modal");
var nextjs_progressbar_1 = require("nextjs-progressbar");
var react_1 = require("react");
var provider_1 = require("@/redux/provider");
var react_toastify_1 = require("react-toastify");
var debounce = require("debounce").debounce;
var providers_1 = require("./providers");
function RootLayout(_a) {
    var children = _a.children;
    store_1.store.subscribe(
    // we use debounce to save the state once each 800ms
    // for better performances in case multiple changes occur in a short time
    debounce(function () {
        browser_storage_1.saveState(store_1.store.getState());
    }, 800));
    return (react_1["default"].createElement("html", { lang: "en" },
        react_1["default"].createElement("body", null,
            react_1["default"].createElement(provider_1.Providers, null,
                react_1["default"].createElement(providers_1.NextAuthProvider, null,
                    react_1["default"].createElement(LoadingContext_1.LoadingProvider, null,
                        react_1["default"].createElement(ModalContext_1.ModalProvider, null,
                            react_1["default"].createElement(ProjetoContext_1.ProjetoProvider, null,
                                react_1["default"].createElement(AuthContext_1.AuthProvider, null,
                                    react_1["default"].createElement(StepContext_1.StepProvider, null,
                                        react_1["default"].createElement(Layout_1["default"], null,
                                            react_1["default"].createElement(nextjs_progressbar_1["default"], null),
                                            react_1["default"].createElement(Modal_1["default"], null),
                                            react_1["default"].createElement(react_toastify_1.ToastContainer, null),
                                            children)))))))))));
}
exports["default"] = RootLayout;
