"use strict";
exports.__esModule = true;
var Navigation_1 = require("./Navigation");
var Footer_1 = require("./Footer");
var react_1 = require("next-auth/react");
var outline_1 = require("@heroicons/react/outline");
var resources = [
    {
        name: 'Empresa',
        description: 'Informações da Empresa',
        href: '/empresa',
        icon: outline_1.ClipboardListIcon
    },
    {
        name: 'UMF',
        description: 'Unidade de Manejo Florestal',
        href: '/umf',
        icon: outline_1.SupportIcon
    },
    {
        name: 'UPA',
        description: 'Unidade de Produção Anual',
        href: '/upa',
        icon: outline_1.BookmarkAltIcon
    },
    {
        name: 'UT',
        description: 'Unidade de Trabalho',
        href: '#',
        icon: outline_1.CalendarIcon
    },
    {
        name: 'Especies',
        description: 'Espécies Existentes',
        href: '/especie',
        icon: outline_1.PencilIcon
    },
    {
        name: 'Categoria de Espécies',
        description: 'Critérios de seleção',
        href: '/categoria-especie',
        icon: outline_1.TemplateIcon
    }
];
var solutions = [
    {
        name: 'Inventário Florestal',
        description: 'Get a better understanding of where your traffic is coming from.',
        href: '#',
        icon: outline_1.ChartBarIcon
    },
    {
        name: 'Manejo Florestal',
        description: 'Speak directly to your customers in a more meaningful way.',
        href: '#',
        icon: outline_1.CursorClickIcon
    },
    { name: 'Segurança', description: "Your customers' data will be safe and secure.", href: '#', icon: outline_1.ShieldCheckIcon },
    {
        name: 'Integração com GIS',
        description: "Connect with third-party tools that you're already using.",
        href: '#',
        icon: outline_1.ViewGridIcon
    },
    {
        name: 'Mapeamento',
        description: 'Build strategic funnels that will drive your customers to convert',
        href: '#',
        icon: outline_1.RefreshIcon
    },
];
var planejamento = [
    {
        name: 'Cadastro do POA',
        description: 'Cadastro do Planejamento Operacional Anual',
        href: '#',
        icon: outline_1.ChartBarIcon
    },
    {
        name: 'Seleção de Árvores',
        description: 'Seleção de Árvores do POA',
        href: '#',
        icon: outline_1.BellIcon
    },
];
var estatistica = [
    {
        name: 'Machine Learning',
        description: 'Modelo preditivos baseados em aprendizado de máquina',
        href: '#',
        icon: outline_1.ChartBarIcon
    },
    {
        name: 'Rede Neural',
        description: 'Modelos preditivos baseados em Redes Neurais',
        href: '#',
        icon: outline_1.BellIcon
    },
];
var inventario = [
    {
        name: 'Digitação de Arvores',
        description: 'Realizar cadastramento do invetário obtido em campo',
        href: '#',
        icon: outline_1.ChartBarIcon
    },
    {
        name: 'Linkar GPS',
        description: 'Linka as posições do GPS com as árvores',
        href: '#',
        icon: outline_1.MapIcon,
        subMenuItems: [
            {
                name: 'Cartesiano X e Y',
                description: 'Usar Plano cartesiano',
                href: '#',
                icon: outline_1.MapIcon
            },
            {
                name: 'GPS',
                description: 'Linka as posições do GPS com as árvores',
                href: '#',
                icon: outline_1.MapIcon
            },
        ]
    },
    {
        name: 'Importar Inventário',
        description: 'Realizar importação de inventário a partir de um dataset',
        href: '#',
        icon: outline_1.MenuIcon
    },
];
var custodia = [
    {
        name: 'Cadastro de Derrubada',
        description: 'Cadastro de Deburrada',
        href: '#',
        icon: outline_1.PencilAltIcon
    },
    {
        name: 'Cadastro de Toras',
        description: 'Cadastro de Toras',
        href: '#',
        icon: outline_1.CursorClickIcon
    },
    {
        name: 'Saída de de Toras',
        description: 'Saída de Toras',
        href: '#',
        icon: outline_1.TableIcon
    },
];
var reports = [
    {
        name: 'Relatório de Espécies',
        // description: 'Cadastro de Deburrada',
        href: '#',
        icon: outline_1.PencilAltIcon
    },
    {
        name: 'Relatório de UTs',
        // description: 'Cadastro de Toras',
        href: '#',
        icon: outline_1.CursorClickIcon
    },
    {
        name: 'Relatório de Saída de Toras',
        // description: 'Saída de Toras',
        href: '#',
        icon: outline_1.TableIcon
    },
];
var Layout = function (_a) {
    var children = _a.children;
    var _b = react_1.useSession(), session = _b.data, status = _b.status;
    var defaultNavigation = [
        { name: 'Dashboard', href: '/', current: false, visible: !session, subMenu: false, subMenuItems: [] },
        { name: 'Soluções', href: '#', current: false, visible: !session, subMenu: true, subMenuItems: solutions },
        { name: 'Cadastro', href: '#', current: false, visible: !!session, subMenu: true, subMenuItems: resources },
        { name: 'Inventário', href: '#', current: false, visible: !!session, subMenu: true, subMenuItems: inventario },
        { name: 'Planejamento', href: '#', current: false, visible: !!session, subMenu: true, subMenuItems: planejamento },
        { name: 'Estatística', href: '#', current: false, visible: !!session, subMenu: true, subMenuItems: estatistica },
        { name: 'Cadeia de Custódia', href: '#', current: false, visible: !!session, subMenu: true, subMenuItems: custodia },
        { name: 'Relatórios', href: '#', current: false, visible: !!session, subMenu: true, subMenuItems: reports }
    ];
    var userNavigation = [
        { name: 'Perfil', href: '#' },
        { name: 'Alterar Senha', href: '/user/change-password' },
        { name: 'Logout', href: '#', click: function () { return react_1.signOut(); } },
    ];
    return (React.createElement("div", { className: "content font-roboto" },
        React.createElement(Navigation_1["default"], { session: session, defaultNavigation: defaultNavigation, userNavigation: userNavigation }),
        React.createElement("div", { className: "lg:pt-14" }, children),
        React.createElement(Footer_1["default"], null)));
};
exports["default"] = Layout;
