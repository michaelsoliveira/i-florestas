'use client';
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
exports.__esModule = true;
exports.ModalProvider = exports.useModalContext = void 0;
var react_1 = require("react");
var initialState = {
    showModal: function () { },
    hideModal: function () { },
    store: {}
};
// context
var ModalContext = react_1.createContext(initialState);
// Provider
var ModalProvider = function (_a) {
    var children = _a.children;
    var _b = react_1.useState({}), store = _b[0], setStore = _b[1];
    var showModal = function (modalProps) {
        if (modalProps === void 0) { modalProps = {}; }
        setStore(__assign(__assign(__assign({}, store), modalProps), { visible: true }));
    };
    var hideModal = function () { return setStore({ modalProps: {}, onConfirm: function () { }, visible: false }); };
    return (react_1["default"].createElement(ModalContext.Provider, { value: { store: store, showModal: showModal, hideModal: hideModal } }, children));
};
exports.ModalProvider = ModalProvider;
var useModalContext = function () {
    var context = react_1.useContext(ModalContext);
    return context;
};
exports.useModalContext = useModalContext;
