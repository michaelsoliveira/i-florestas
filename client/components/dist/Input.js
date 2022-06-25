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
var react_1 = require("react");
var Input = function (props, ref) {
    var id = props.id, _a = props.wrapperClassName, wrapperClassName = _a === void 0 ? '' : _a, _b = props.placeholder, placeholder = _b === void 0 ? '' : _b, _c = props.label, label = _c === void 0 ? '' : _c, _d = props.type, type = _d === void 0 ? 'text' : _d, _e = props.error, error = _e === void 0 ? false : _e, _f = props.errorText, errorText = _f === void 0 ? '' : _f, _g = props.required, required = _g === void 0 ? false : _g, name = props.name, _h = props.register, register = _h === void 0 ? function () { } : _h, forwardRef = props.forwardRef, rest = __rest(props, ["id", "wrapperClassName", "placeholder", "label", "type", "error", "errorText", "required", "name", "register", "forwardRef"]);
    // const { register } = useForm()
    // const inputRef = useRef<HTMLInputElement>();
    var inputRef = register(name, { required: required });
    return (React.createElement("div", { className: wrapperClassName },
        React.createElement("div", { className: "border transition duration-150 ease-in-out " + (error
                ? 'focus-within:border-red border-red'
                : 'focus-within:border-primary border-gray-gray4'), onClick: function () { var _a; return (_a = inputRef.ref.current) === null || _a === void 0 ? void 0 : _a.focus(); } },
            React.createElement("label", { htmlFor: id, className: 'text-xs text-primary font-light placeholder-gray-gray4 px-2 pt-1.5' },
                label,
                " ",
                required && React.createElement("span", { className: 'text-red' }, "*")),
            React.createElement("input", __assign({ ref: inputRef.ref, type: type, className: 'w-full px-2 pb-1.5 text-primary outline-none text-base font-light rounded-md', id: id, placeholder: placeholder }, rest))),
        errorText && (React.createElement("p", { className: 'text-xs pl-2  text-red mb-4' }, errorText))));
};
exports["default"] = react_1.forwardRef(Input);
