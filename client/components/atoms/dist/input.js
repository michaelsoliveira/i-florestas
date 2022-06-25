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
exports.Input = void 0;
var react_1 = require("react");
var classnames_1 = require("classnames");
// Using maps so that the full Tailwind classes can be seen for purging
// see https://tailwindcss.com/docs/optimizing-for-production#writing-purgeable-html
var sizeMap = {
    medium: 'p-3 text-base',
    large: 'p-4 text-base'
};
exports.Input = react_1.forwardRef(function (_a, ref) {
    var id = _a.id, name = _a.name, label = _a.label, _b = _a.type, type = _b === void 0 ? 'text' : _b, _c = _a.size, size = _c === void 0 ? 'medium' : _c, _d = _a.className, className = _d === void 0 ? '' : _d, placeholder = _a.placeholder, rest = __rest(_a, ["id", "name", "label", "type", "size", "className", "placeholder"]);
    return (react_1["default"].createElement("input", __assign({ id: id, ref: ref, name: name, type: type, "aria-label": label, placeholder: placeholder, className: classnames_1["default"]([
            'relative inline-flex w-full rounded leading-none transition-colors ease-in-out placeholder-gray-500 text-gray-700 border border-gray-300 hover:border-blue-400 focus:outline-none focus:border-blue-400 focus:ring-blue-400 focus:ring-4 focus:ring-opacity-30',
            sizeMap[size],
            className,
        ]) }, rest)));
});
exports.Input.displayName = 'Input';
// export default Input
