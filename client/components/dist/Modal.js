"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_2 = require("@headlessui/react");
var outline_1 = require("@heroicons/react/outline");
var classNames_1 = require("./Utils/classNames");
function Modal(props) {
    var title = props.title, buttonText = props.buttonText, bodyText = props.bodyText, styleButton = props.styleButton, parentReturnData = props.parentReturnData, parentFunction = props.parentFunction, hideModal = props.hideModal, open = props.open, data = props.data, className = props.className;
    //   const [open, setOpen] = useState(true)
    var cancelButtonRef = react_1.useRef(null);
    function openModal() {
        parentReturnData(data === null || data === void 0 ? void 0 : data.id);
    }
    function callBackFunction(id) {
        parentFunction(id);
    }
    return (React.createElement(react_2.Transition.Root, { show: open, as: react_1.Fragment },
        React.createElement(react_2.Dialog, { as: "div", className: classNames_1["default"]("fixed z-10 inset-0 overflow-y-auto", className), initialFocus: cancelButtonRef, onClose: hideModal },
            React.createElement("div", { className: "flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0" },
                React.createElement(react_2.Transition.Child, { as: react_1.Fragment, enter: "ease-out duration-300", enterFrom: "opacity-0", enterTo: "opacity-100", leave: "ease-in duration-200", leaveFrom: "opacity-100", leaveTo: "opacity-0" },
                    React.createElement(react_2.Dialog.Overlay, { className: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" })),
                React.createElement("span", { className: "hidden sm:inline-block sm:align-middle sm:h-screen", "aria-hidden": "true" }, "\u200B"),
                React.createElement(react_2.Transition.Child, { as: react_1.Fragment, enter: "ease-out duration-300", enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95", enterTo: "opacity-100 translate-y-0 sm:scale-100", leave: "ease-in duration-200", leaveFrom: "opacity-100 translate-y-0 sm:scale-100", leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" },
                    React.createElement("div", { className: "inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" },
                        React.createElement("div", { className: "bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4" },
                            React.createElement("div", { className: "sm:flex sm:items-start" },
                                React.createElement("div", { className: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10" },
                                    React.createElement(outline_1.ExclamationIcon, { className: "h-6 w-6 text-red-600", "aria-hidden": "true" })),
                                React.createElement("div", { className: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" },
                                    React.createElement(react_2.Dialog.Title, { as: "h3", className: "text-lg leading-6 font-medium text-gray-900" }, title),
                                    React.createElement("div", { className: "mt-2" },
                                        React.createElement("p", { className: "text-sm text-gray-500" }, bodyText))))),
                        React.createElement("div", { className: "bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" },
                            React.createElement("button", { type: "button", className: classNames_1["default"]('w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm', styleButton), onClick: function () { return callBackFunction(data.id); } }, buttonText),
                            React.createElement("button", { type: "button", className: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm", onClick: function () { return hideModal(); }, ref: cancelButtonRef }, "Cancel"))))))));
}
exports["default"] = Modal;
