"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Option_1 = require("./Option");
var RadioGroup = function (_a) {
    var options = _a.options, onChange = _a.onChange, value = _a.value, labelText = _a.labelText;
    var _b = react_1.useState(value), selectedIndex = _b[0], setSelectedIndex = _b[1];
    function onSelect(index) {
        setSelectedIndex(index);
        onChange && onChange(index);
    }
    return (react_1["default"].createElement("div", null,
        labelText && (react_1["default"].createElement("label", { className: "block text-gray-600 mb-2 text-xs lg:text-sm xl:text-base" }, labelText)),
        react_1["default"].createElement("div", { className: "flex justify-evenly" }, options.map(function (el, index) { return (react_1["default"].createElement(Option_1["default"], { key: index, index: index, selectedIndex: selectedIndex, onSelect: function (index) { return onSelect(index); } }, el)); }))));
};
exports["default"] = RadioGroup;
