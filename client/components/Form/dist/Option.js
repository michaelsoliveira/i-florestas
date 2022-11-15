"use strict";
exports.__esModule = true;
var Option = function (props) {
    var isSelected = props.index === props.selectedIndex;
    return (React.createElement("div", { className: "flex items-center gap-2 shadow cursor-pointer transition duration-300 bg-slate-50 mx-1 rounded-md p-2 py-3  flex-1 text-xs font-bold text-slate-600 lg:font-normal lg:text-sm hover:shadow-md " + (isSelected && "bg-cyan-50"), onClick: function () { return props.onSelect(props.index); } },
        React.createElement("div", { className: "rounded-full w-4 h-4 border transition " + (isSelected && "border-4 border-sky-500 bg-sky-300") + " " }),
        props.children));
};
exports["default"] = Option;
