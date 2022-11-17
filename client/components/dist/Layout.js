"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Navigation_1 = require("./Navigation");
var Footer_1 = require("./Footer");
var react_2 = require("next-auth/react");
var Menus_1 = require("./Menus");
var Loading_1 = require("@/components/Loading");
var LoadingContext_1 = require("contexts/LoadingContext");
var Layout = function (_a) {
    var children = _a.children;
    var _b = react_2.useSession(), session = _b.data, status = _b.status;
    var user = session === null || session === void 0 ? void 0 : session.user;
    var _c = react_1.useContext(LoadingContext_1.LoadingContext), loading = _c.loading, setLoading = _c.setLoading;
    // useEffect(() => {
    //     setLoading(false)
    // }, [setLoading])
    var defaultNavigation = [
        { name: 'Dashboard', href: '/', current: false, visible: !session, subMenu: false, subMenuItems: [] },
        { name: 'Soluções', href: '#', current: false, visible: !session, subMenu: true, subMenuItems: Menus_1.solutions },
        { name: 'Cadastro', href: '#', current: false, visible: !!session, subMenu: true, subMenuItems: Menus_1.resources },
        { name: 'Inventário', href: '#', current: false, visible: !!session, subMenu: true, subMenuItems: Menus_1.inventario },
        { name: 'Planejamento', href: '#', current: false, visible: !!session, subMenu: true, subMenuItems: Menus_1.planejamento },
        { name: 'Estatística', href: '#', current: false, visible: !!session, subMenu: true, subMenuItems: Menus_1.estatistica },
        { name: 'Cadeia de Custódia', href: '#', current: false, visible: !!session, subMenu: true, subMenuItems: Menus_1.custodia },
        { name: 'Relatórios', href: '#', current: false, visible: !!session, subMenu: true, subMenuItems: Menus_1.reports }
    ];
    var userNavigation = [
        { name: "Perfil (" + (user === null || user === void 0 ? void 0 : user.username) + ")", href: '#' },
        { name: 'Alterar Senha', href: '/user/change-password' },
        { name: 'Logout', href: '#', click: function () { return react_2.signOut({ callbackUrl: "/" }); } },
    ];
    return (React.createElement("div", { className: "relative" },
        loading && (React.createElement(Loading_1.Loading, null)),
        React.createElement("div", null,
            React.createElement(Navigation_1["default"], { defaultNavigation: defaultNavigation, userNavigation: userNavigation })),
        React.createElement("div", { className: "lg:pt-14" }, children),
        React.createElement("div", { className: "" },
            React.createElement(Footer_1["default"], null))));
};
exports["default"] = Layout;
