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
/* This example requires Tailwind CSS v2.0+ */
var react_1 = require("react");
var react_2 = require("@headlessui/react");
var Link_1 = require("./Link");
var Logo_1 = require("./Logo");
var outline_1 = require("@heroicons/react/outline");
var solid_1 = require("@heroicons/react/solid");
var router_1 = require("next/router");
var classnames_1 = require("classnames");
// function classNames(...classes: any[]) {
//   return classes.filter(Boolean).join(' ')
// }
function Navigation(_a) {
    var session = _a.session, defaultNavigation = _a.defaultNavigation, userNavigation = _a.userNavigation;
    // const { data: session, status } = useSession()
    var router = router_1.useRouter();
    var _b = react_1.useState([]), navigation = _b[0], setNavigation = _b[1];
    var _c = react_1.useState(false), sticky = _c[0], setSticky = _c[1];
    var handleScroll = function () {
        if (scrollY > 72) {
            setSticky(true);
        }
        else if (scrollY < 72) {
            setSticky(false);
        }
    };
    react_1.useEffect(function () {
        addEventListener('scroll', handleScroll);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    var changeCurrentParent = function (key, href) {
        var changeCurrentNav = defaultNavigation.map(function (nav, index) {
            if (key !== index) {
                return __assign(__assign({}, nav), { current: false });
            }
            else {
                return __assign(__assign({}, nav), { current: true });
            }
        });
        setNavigation(changeCurrentNav);
        if (href)
            router.push(href);
    };
    var checkCurrentNavigation = react_1.useCallback(function () {
        defaultNavigation === null || defaultNavigation === void 0 ? void 0 : defaultNavigation.map(function (nav, indexParent) {
            var _a;
            if (nav === null || nav === void 0 ? void 0 : nav.subMenuItems) {
                if (router.pathname === nav.href) {
                    return changeCurrentParent(indexParent);
                }
                (_a = nav.subMenuItems) === null || _a === void 0 ? void 0 : _a.map(function (subMenu, index) {
                    if (router.pathname === subMenu.href) {
                        return changeCurrentParent(indexParent);
                    }
                });
            }
        });
    }, [changeCurrentParent, defaultNavigation, router.pathname]);
    react_1.useEffect(function () {
        setNavigation(defaultNavigation);
        if (session) {
            checkCurrentNavigation();
        }
    }, [session]);
    return (React.createElement(react_2.Disclosure, { as: "nav", className: classnames_1["default"]("lg:absolute items-center w-full opacity-100 z-50") }, function (_a) {
        var _b, _c, _d, _e, _f, _g;
        var open = _a.open;
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: classnames_1["default"]("px-4 sm:px-6 lg:px-8 bg-gray-50 shadow z-50", sticky ? 'lg:fixed w-full opacity-100 transition transition-ease duration-500 translate-y-0' : '') },
                React.createElement("div", { className: "flex items-center justify-between h-16" },
                    React.createElement("div", { className: classnames_1["default"]("flex items-center justify-between max-w-full w-full") },
                        React.createElement("div", { className: "flex-shrink-0 lg:-mr-16" },
                            React.createElement(Link_1.Link, { href: "/" },
                                React.createElement(Logo_1["default"], { width: 'w-10', height: 'h-10' }))),
                        React.createElement("div", { className: "hidden md:block" },
                            React.createElement("div", { className: "ml-10 flex items-baseline space-x-4" }, navigation === null || navigation === void 0 ? void 0 : navigation.map(function (item, key) { return (item.visible && (!item.subMenu ?
                                (React.createElement("a", { key: key, href: item.href, onClick: function (evt) {
                                        evt.preventDefault();
                                        changeCurrentParent(key, item.href);
                                        open = !open;
                                    }, className: classnames_1["default"](item.current
                                        ? 'border-b-2 border-green-700 text-gray-700 bg-gray-100'
                                        : 'text-gray-700 hover:border-b-2 hover:border-green-700 hover:text-green-800 transition duration-500 ease-in-out hover:bg-gray-200 transform hover:-translate-y-1 hover:scale-105', 'px-6 py-2 text-sm font-medium hover:bg-gray-100 in-line flex'), "aria-current": item.current ? 'page' : undefined }, item.name)) :
                                (React.createElement(react_2.Menu, { onClick: function (evt) {
                                        evt.preventDefault();
                                        changeCurrentParent(key);
                                    }, as: "div", className: classnames_1["default"]((item === null || item === void 0 ? void 0 : item.current) && 'border-b-2 border-green-700 text-gray-700 bg-gray-100', "relative inline-block text-left"), key: key }, function (_a) {
                                    var _b;
                                    var open = _a.open;
                                    return (React.createElement(React.Fragment, null,
                                        React.createElement("div", null,
                                            React.createElement(react_2.Menu.Button, { className: classnames_1["default"](!(item === null || item === void 0 ? void 0 : item.current) && 'hover:border-b-2 hover:border-green-700 hover:text-green-800', "inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700  transition duration-500 ease-in-out hover:bg-gray-200 transform hover:-translate-y-1 hover:scale-105") },
                                                item.name,
                                                React.createElement(solid_1.ChevronDownIcon, { className: classnames_1["default"](open ? 'text-green-700' : 'text-gray-400', 'w-5 h-5 ml-2 -mr-1'), "aria-hidden": "true" }))),
                                        React.createElement(react_2.Transition, { as: react_1.Fragment, enter: "transition ease-out duration-100", enterFrom: "transform opacity-0 scale-95", enterTo: "transform opacity-100 scale-100", leave: "transition ease-in duration-75", leaveFrom: "transform opacity-100 scale-100", leaveTo: "transform opacity-0 scale-95" },
                                            React.createElement(react_2.Menu.Items, { className: classnames_1["default"]("z-30 absolute w-72 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none") }, (_b = item.subMenuItems) === null || _b === void 0 ? void 0 : _b.map(function (subMenu, key) {
                                                var _a;
                                                return (!subMenu.subMenuItems ?
                                                    (React.createElement("div", { className: 'px-2 py-2', key: key },
                                                        React.createElement(react_2.Menu.Item, { key: key }, function (_a) {
                                                            var active = _a.active;
                                                            return (React.createElement(Link_1.Link, { href: subMenu === null || subMenu === void 0 ? void 0 : subMenu.href, className: classnames_1["default"](active ? 'bg-gray-100' : 'text-gray-800', router.pathname === (subMenu === null || subMenu === void 0 ? void 0 : subMenu.href) && 'bg-gray-100', 'group flex rounded-md items-center w-full px-2 py-2 text-sm') },
                                                                (subMenu === null || subMenu === void 0 ? void 0 : subMenu.icon) && (React.createElement(subMenu.icon, { className: "flex-shrink-0 h-6 w-6 text-green-700", "aria-hidden": "true" })),
                                                                React.createElement("div", { className: "ml-4", "aria-hidden": "true" },
                                                                    React.createElement("p", { className: "text-base font-medium text-gray-900" }, subMenu.name),
                                                                    (subMenu === null || subMenu === void 0 ? void 0 : subMenu.description) && (React.createElement("p", { className: "mt-1 text-sm text-gray-500" }, subMenu === null || subMenu === void 0 ? void 0 : subMenu.description)))));
                                                        }))) :
                                                    (React.createElement("div", { key: key },
                                                        React.createElement(react_2.Menu, null,
                                                            React.createElement("div", { className: 'px-2 py-2 w-full' },
                                                                React.createElement(react_2.Menu.Button, { className: classnames_1["default"](!subMenu.icon ? 'text-sm px-14' : '', "inline-flex w-full rounded-md px-4 py-2 text-sm font-medium text-gray-700  transition duration-500 ease-in-out hover:bg-gray-100") },
                                                                    (subMenu === null || subMenu === void 0 ? void 0 : subMenu.icon) && (React.createElement(subMenu.icon, { className: "flex-shrink-0 h-6 w-6 text-green-700", "aria-hidden": "true" })),
                                                                    React.createElement("div", { className: "ml-2", "aria-hidden": "true" },
                                                                        React.createElement("p", { className: "text-base font-medium text-gray-900" }, subMenu.name)),
                                                                    React.createElement("div", { className: 'flex absolute right-0 mr-6' },
                                                                        React.createElement(solid_1.ChevronRightIcon, { className: classnames_1["default"](open ? 'text-green-700' : 'text-gray-400', 'w-5 h-5 ml-2 -mr-1'), "aria-hidden": "true" })))),
                                                            React.createElement(react_2.Transition, { enter: "transition duration-100 ease-out", enterFrom: "transform scale-95 opacity-0", enterTo: "transform scale-100 opacity-100", leave: "transition duration-75 ease-out", leaveFrom: "transform scale-100 opacity-100", leaveTo: "transform scale-95 opacity-0" }),
                                                            React.createElement(react_2.Menu.Items, { className: classnames_1["default"]("z-30 absolute -mr-8 -mt-12 w-72 -right-60 origin-left bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none") }, (_a = subMenu.subMenuItems) === null || _a === void 0 ? void 0 : _a.map(function (subsubMenu, subKey) { return (
                                                            // eslint-disable-next-line react/jsx-key
                                                            React.createElement("div", { className: 'px-2 py-2', key: subKey },
                                                                React.createElement(react_2.Menu.Item, { key: subKey }, function (_a) {
                                                                    var active = _a.active;
                                                                    return (React.createElement(Link_1.Link, { href: subMenu === null || subMenu === void 0 ? void 0 : subMenu.href, className: classnames_1["default"](active ? 'bg-gray-100' : 'text-gray-800', router.pathname === (subMenu === null || subMenu === void 0 ? void 0 : subMenu.href) && 'bg-gray-100', 'group flex rounded-md items-center w-full px-2 py-2 text-sm') },
                                                                        (subsubMenu === null || subsubMenu === void 0 ? void 0 : subsubMenu.icon) && (React.createElement(subsubMenu.icon, { className: "flex-shrink-0 h-6 w-6 text-green-700", "aria-hidden": "true" })),
                                                                        React.createElement("div", { className: "ml-4", "aria-hidden": "true" },
                                                                            React.createElement("p", { className: "text-base font-medium text-gray-900" }, subsubMenu.name),
                                                                            (subsubMenu === null || subsubMenu === void 0 ? void 0 : subsubMenu.description) && (React.createElement("p", { className: "mt-1 text-sm text-gray-500" }, subsubMenu === null || subsubMenu === void 0 ? void 0 : subsubMenu.description)))));
                                                                }))); }))))));
                                            })))));
                                })))); }))),
                        React.createElement("div", { className: 'hidden lg:flex lg:flex-row' }, !session && (React.createElement("div", { className: "px-2 lg:space-x-2" },
                            React.createElement(Link_1.Link, { href: "/login", className: "bg-green-700 shadow text-sm px-6 py-3 \n                    text-white rounded-lg hover:text-white transition duration-500 ease-in-out hover:bg-green-600\n                    transform hover:-translate-y-1 hover:scale-105" }, "Fazer login"),
                            React.createElement(Link_1.Link, { href: "/signup", className: "bg-gray-100 shadow text-sm px-6 py-3\n                    text-green-700 rounded-lg hover:text-green-600 transition duration-500 ease-in-out hover:bg-gray-200\n                    transform hover:-translate-y-1 hover:scale-105" }, "Cadastre-se"))))),
                    session && (React.createElement("div", { className: "hidden md:block" },
                        React.createElement("div", { className: "ml-4 flex items-center md:ml-6" },
                            React.createElement("button", { type: "button", className: "bg-gray-200 p-1 rounded-full text-gray-700 hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-800 focus:ring-white" },
                                React.createElement("span", { className: "sr-only" }, "View notifications"),
                                React.createElement(outline_1.BellIcon, { className: "h-6 w-6", "aria-hidden": "true" })),
                            React.createElement(react_2.Menu, { as: "div", className: "ml-3 relative" },
                                React.createElement("div", null,
                                    React.createElement(react_2.Menu.Button, { className: "max-w-xs bg-gray-700 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-700 focus:ring-white" },
                                        React.createElement("span", { className: "sr-only" }, "Open user menu"),
                                        React.createElement("img", { className: "h-8 w-10 rounded-full", src: session && ((_b = session.user) === null || _b === void 0 ? void 0 : _b.image) !== null ? ((_c = session.user) === null || _c === void 0 ? void 0 : _c.image) || 'https://img.icons8.com/office/80/000000/administrator-male--v1.png' : '', alt: "" }))),
                                React.createElement(react_2.Transition, { as: react_1.Fragment, enter: "transition ease-out duration-100", enterFrom: "transform opacity-0 scale-95", enterTo: "transform opacity-100 scale-100", leave: "transition ease-in duration-75", leaveFrom: "transform opacity-100 scale-100", leaveTo: "transform opacity-0 scale-95" },
                                    React.createElement(react_2.Menu.Items, { className: "origin-top-right absolute z-20 right-0 mt-2 w-48 shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" }, userNavigation.map(function (item, key) { return (React.createElement(react_2.Menu.Item, { key: key }, function (_a) {
                                        var active = _a.active;
                                        return (React.createElement("a", { href: item.href, className: classnames_1["default"](active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700'), onClick: item.click, "aria-hidden": "true" }, item.name));
                                    })); }))))))),
                    React.createElement("div", { className: "-mr-2 flex md:hidden" },
                        React.createElement(react_2.Disclosure.Button, { className: "bg-gray-200 inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-700 focus:ring-white" },
                            React.createElement("span", { className: "sr-only" }, "Open main menu"),
                            open ? (React.createElement(outline_1.XIcon, { className: "block h-6 w-6", "aria-hidden": "true" })) : (React.createElement(outline_1.MenuIcon, { className: "block h-6 w-6", "aria-hidden": "true" })))))),
            React.createElement(react_2.Disclosure.Panel, { className: "md:hidden" },
                React.createElement("div", { className: "px-2 pt-2 pb-3 space-y-1 sm:px-3" }, navigation.map(function (item, key) { return (item.visible &&
                    (!item.subMenu ?
                        (React.createElement(react_2.Disclosure.Button, { key: key, as: "a", href: item.href, className: classnames_1["default"](item.current ? 'bg-green-700 text-white' : 'text-gray-700 hover:bg-green-700 hover:text-white', 'block px-3 py-2 rounded-md text-base font-medium transition-all'), "aria-current": item.current ? 'page' : undefined }, item.name)) :
                        (React.createElement(react_2.Popover, { as: "div", className: "w-full", key: key }, function (_a) {
                            var _b;
                            var open = _a.open;
                            return (React.createElement(React.Fragment, null,
                                React.createElement("div", null,
                                    React.createElement(react_2.Popover.Button, { className: "inline-flex w-full rounded-md px-3 py-2 font-medium text-gray-700 hover:text-white transition duration-500 ease-in-out hover:bg-green-700" },
                                        item.name,
                                        open ? (React.createElement(solid_1.ChevronUpIcon, { className: classnames_1["default"](open ? 'text-gray-400' : 'text-gray-400', 'w-5 h-5 ml-4 -mr-1'), "aria-hidden": "true" })) : (React.createElement(solid_1.ChevronDownIcon, { className: classnames_1["default"](open ? 'text-gray-400' : 'text-gray-400', 'w-5 h-5 ml-4 -mr-1'), "aria-hidden": "true" })))),
                                React.createElement(react_2.Transition, { as: react_1.Fragment, enter: "transition ease-out duration-100", enterFrom: "transform opacity-0 scale-95", enterTo: "transform opacity-100 scale-100", leave: "transition ease-in duration-75", leaveFrom: "transform opacity-100 scale-100", leaveTo: "transform opacity-0 scale-95" },
                                    React.createElement(react_2.Popover.Panel, { className: "z-30 relative lg:right-0 w-full mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" }, (_b = item.subMenuItems) === null || _b === void 0 ? void 0 : _b.map(function (subMenu, key) {
                                        return (React.createElement("div", { className: 'px-2 py-2', key: key, "aria-hidden": "true" },
                                            React.createElement(Link_1.Link, { href: subMenu.href, className: classnames_1["default"]('hover:bg-gray-100', 'group flex rounded-md items-center w-full px-2 py-2 text-sm'), "aria-hidden": "true" },
                                                (subMenu === null || subMenu === void 0 ? void 0 : subMenu.icon) && (React.createElement(subMenu.icon, { className: "flex-shrink-0 h-6 w-6 text-green-700", "aria-hidden": "true" })),
                                                React.createElement("div", { className: "ml-4" },
                                                    React.createElement("p", { className: "text-base font-medium text-gray-900" }, subMenu.name),
                                                    (subMenu === null || subMenu === void 0 ? void 0 : subMenu.description) && (React.createElement("p", { className: "mt-1 text-sm text-gray-500" }, subMenu === null || subMenu === void 0 ? void 0 : subMenu.description))))));
                                    })))));
                        })))); })),
                session ? (React.createElement("div", { className: "pt-4 pb-3 border-t border-gray-700" },
                    React.createElement("div", { className: "flex items-center px-5" },
                        React.createElement("div", { className: "flex-shrink-0" },
                            React.createElement("img", { className: "h-10 w-10 rounded-full", src: session && ((_d = session.user) === null || _d === void 0 ? void 0 : _d.image) !== null ? ((_e = session.user) === null || _e === void 0 ? void 0 : _e.image) || 'https://img.icons8.com/office/80/000000/administrator-male--v1.png' : '', alt: "" })),
                        React.createElement("div", { className: "ml-3" },
                            React.createElement("div", { className: "text-base font-medium leading-none text-gray-600" }, session && ((_f = session.user) === null || _f === void 0 ? void 0 : _f.name)),
                            React.createElement("div", { className: "text-sm font-medium leading-none text-gray-400" }, session && ((_g = session.user) === null || _g === void 0 ? void 0 : _g.email))),
                        React.createElement("button", { type: "button", className: "ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" },
                            React.createElement("span", { className: "sr-only" }, "View notifications"),
                            React.createElement(outline_1.BellIcon, { className: "h-6 w-6", "aria-hidden": "true" }))),
                    React.createElement("div", { className: "mt-3 px-2 space-y-1", "aria-hidden": "true" }, userNavigation.map(function (item, key) { return (React.createElement(Link_1.Link, { key: key, as: "a", href: item.href, className: "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-green-700", onClick: item.click, "aria-hidden": "true" }, item.name)); })))) : (React.createElement("div", { className: "px-3 pb-2 -mt-1" },
                    React.createElement(Link_1.Link, { href: "/login", className: "block px-2 py-2 rounded-md text-base text-gray-700 hover:text-white hover:bg-green-700 hover:transition-all" }, "Login"))))));
    }));
}
exports["default"] = Navigation;
