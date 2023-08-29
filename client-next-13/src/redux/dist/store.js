'use client';
"use strict";
exports.__esModule = true;
exports.store = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var projetoSlice_1 = require("./features/projetoSlice");
var userSlice_1 = require("./features/userSlice");
var messageSlice_1 = require("./features/messageSlice");
var paginationSlice_1 = require("./features/paginationSlice");
var umfSlice_1 = require("./features/umfSlice");
var upaSlice_1 = require("./features/upaSlice");
var utSlice_1 = require("./features/utSlice");
var poaSlice_1 = require("./features/poaSlice");
var browser_storage_1 = require("./browser-storage");
exports.store = toolkit_1.configureStore({
    middleware: toolkit_1.getDefaultMiddleware({
        serializableCheck: false
    }),
    devTools: true,
    reducer: {
        projeto: projetoSlice_1["default"],
        user: userSlice_1["default"],
        message: messageSlice_1["default"],
        pagination: paginationSlice_1["default"],
        umf: umfSlice_1["default"],
        upa: upaSlice_1["default"],
        ut: utSlice_1["default"],
        poa: poaSlice_1["default"]
    },
    preloadedState: browser_storage_1.loadState()
});
