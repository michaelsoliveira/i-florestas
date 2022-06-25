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
var axios_1 = require("axios");
var react_1 = require("next-auth/react");
var react_2 = require("react");
// import { getSession } from 'next-auth/react'
var useClient = function (options) {
    var session = react_1.useSession().data;
    var token = session === null || session === void 0 ? void 0 : session.accessToken;
    // const handleError = useErrorHandler();
    return react_2.useMemo(function () {
        var api = axios_1["default"].create({
            baseURL: 'http://192.168.1.105:3333',
            headers: __assign({ Authorization: token ? "Bearer " + token : '' }, ((options === null || options === void 0 ? void 0 : options.headers) ? options.headers : {}))
        });
        api.interceptors.response.use(function (response) {
            return response;
        }, function (error) {
            var status = error.response.status;
            if (status === 401) {
                react_1.signOut();
                // return location.href = '/'
            }
            return Promise.reject(error);
        });
        return api;
    }, [options, token]);
};
exports["default"] = useClient;
