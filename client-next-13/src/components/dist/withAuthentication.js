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
var prop_types_1 = require("prop-types");
var react_1 = require("next-auth/react");
var navigation_1 = require("next/navigation");
var withAuthentication = function (WrappedComponent) {
    var RequiresAuthentication = function (props) {
        var _a = react_1.useSession(), session = _a.data, status = _a.status;
        var router = navigation_1.useRouter();
        if (typeof session !== typeof undefined) {
            if (!session) {
                router.push('/login');
            }
        }
        // if there's a loggedInUser, show the wrapped page, otherwise show a loading indicator
        return session ? React.createElement(WrappedComponent, __assign({}, props)) : React.createElement("div", null);
        // :
        // <div className="flex flex-row items-center justify-center w-full h-screen opacity-50">
        //     {/* <h1 className="text-green-900 text-2xl">Loading...</h1> */}
        //     <Loading />
        // </div>;
    };
    return RequiresAuthentication;
};
withAuthentication.propTypes = {
    WrappedComponent: prop_types_1["default"].node.isRequired
};
exports["default"] = withAuthentication;
