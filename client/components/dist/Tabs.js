"use strict";
exports.__esModule = true;
var react_1 = require("@headlessui/react");
var classnames_1 = require("classnames");
var Login_1 = require("./Login");
var RegisterForm_1 = require("./RegisterForm");
var styles = {
    label: 'block text-gray-700 text-sm font-bold pt-2 pb-1',
    field: 'text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none',
    button: ' bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-500',
    errorMsg: 'text-red-500 text-sm'
};
var Tabs = function () {
    return (React.createElement("div", { className: "w-full py-4" },
        React.createElement(react_1.Tab.Group, null,
            React.createElement(react_1.Tab.List, { className: "flex p-1 space-x-2 bg-green-900/20 rounded-lg" },
                React.createElement(react_1.Tab, { className: function (_a) {
                        var selected = _a.selected;
                        return classnames_1["default"]('w-full py-2.5 text-sm leading-5 font-medium rounded-md transition-all', 'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-green-400 ring-white ring-opacity-60', selected
                            ? 'bg-green-700 text-white shadow'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-700');
                    } }, "Login"),
                React.createElement(react_1.Tab, { className: function (_a) {
                        var selected = _a.selected;
                        return classnames_1["default"]('w-full py-2.5 text-sm leading-5 font-medium rounded-md transition-all', 'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-green-400 ring-white ring-opacity-60', selected
                            ? 'bg-green-700 text-white shadow'
                            : 'text-gray-700 hover:bg-gray-100 hover:text-green-700');
                    } }, "Cadastro")),
            React.createElement(react_1.Tab.Panels, { className: "mt-2" },
                React.createElement(react_1.Tab.Panel, { className: classnames_1["default"]('bg-white shadow-lg rounded-xl px-6 py-4') },
                    React.createElement(Login_1["default"], null)),
                React.createElement(react_1.Tab.Panel, { className: classnames_1["default"]('bg-white shadow-lg rounded-xl px-4 py-2 text-left') },
                    React.createElement(RegisterForm_1.RegisterForm, { styles: styles, redirect: true }))))));
};
exports["default"] = Tabs;
