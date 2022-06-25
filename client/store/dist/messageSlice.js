"use strict";
exports.__esModule = true;
exports.clearMessage = exports.setMessage = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = {
    message: ''
};
var messageSlice = toolkit_1.createSlice({
    name: "message",
    initialState: initialState,
    reducers: {
        setMessage: function (state, action) {
            state.message = action.payload;
        },
        clearMessage: function () {
            return { message: '' };
        }
    }
});
var reducer = messageSlice.reducer, actions = messageSlice.actions;
exports.setMessage = actions.setMessage, exports.clearMessage = actions.clearMessage;
exports["default"] = reducer;
