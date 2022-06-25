"use strict";
exports.__esModule = true;
exports.store = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var umfSlice_1 = require("./umfSlice");
var userSlice_1 = require("./userSlice");
var messageSlice_1 = require("./messageSlice");
var paginationSlice_1 = require("./paginationSlice");
var umfSlice_2 = require("./umfSlice");
var browser_storage_1 = require("./browser-storage");
exports.store = toolkit_1.configureStore({
    devTools: true,
    reducer: {
        project: umfSlice_1["default"],
        user: userSlice_1["default"],
        message: messageSlice_1["default"],
        pagination: paginationSlice_1["default"],
        umf: umfSlice_2["default"]
    },
    preloadedState: browser_storage_1.loadState()
});
