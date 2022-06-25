import { ReactNode, useContext, SVGProps } from "react"
import Navigation from './Navigation'
import Footer from './Footer'
import { useSession, signOut } from "next-auth/react"
import {
    BookmarkAltIcon,
    CalendarIcon,
    ChartBarIcon,
    CursorClickIcon,
    MenuIcon,
    TemplateIcon,
    PencilAltIcon,
    PencilIcon,
    RefreshIcon,
    ShieldCheckIcon,
    SupportIcon,
    ViewGridIcon,
    XIcon,
    MapIcon,
    BellIcon,
    TableIcon,
    ClipboardListIcon
} from '@heroicons/react/outline'

export type props = {
    children: ReactNode
}

    const resources = [
    {
        name: 'Empresa',
        description: 'Informações da Empresa',
        href: '/empresa',
        icon: ClipboardListIcon,
    },
    {
        name: 'UMF',
        description: 'Unidade de Manejo Florestal',
        href: '/umf',
        icon: SupportIcon,
    },
    {
        name: 'UPA',
        description: 'Unidade de Produção Anual',
        href: '/upa',
        icon: BookmarkAltIcon,
    },
    {
        name: 'UT',
        description: 'Unidade de Trabalho',
        href: '#',
        icon: CalendarIcon,
        },
    {
        name: 'Especies',
        description: 'Espécies Existentes',
        href: '/especie',
        icon: PencilIcon,
        // subResource: [
        //     {
        //         name: 'Categoria de Espécies',
        //         description: 'Categoria de Espécies',
        //         href: '/categoria-especie',
        //         icon: ClipboardListIcon,
        //     }
        // ]
    },
    {
        name: 'Categoria de Espécies',
        description: 'Critérios de seleção',
        href: '/categoria-especie',
        icon: TemplateIcon,
    }
    
    ]

    const solutions = [
        {
            name: 'Inventário Florestal',
            description: 'Get a better understanding of where your traffic is coming from.',
            href: '#',
            icon: ChartBarIcon,
        },
        {
            name: 'Manejo Florestal',
            description: 'Speak directly to your customers in a more meaningful way.',
            href: '#',
            icon: CursorClickIcon,
        },
        { name: 'Segurança', description: "Your customers' data will be safe and secure.", href: '#', icon: ShieldCheckIcon },
        {
            name: 'Integração com GIS',
            description: "Connect with third-party tools that you're already using.",
            href: '#',
            icon: ViewGridIcon,
        },
        {
            name: 'Mapeamento',
            description: 'Build strategic funnels that will drive your customers to convert',
            href: '#',
            icon: RefreshIcon,
        },
    ]

    const planejamento = [
    {
        name: 'Cadastro do POA',
        description: 'Cadastro do Planejamento Operacional Anual',
        href: '#',
        icon: ChartBarIcon,
    },
    {
        name: 'Seleção de Árvores',
        description: 'Seleção de Árvores do POA',
        href: '#',
        icon: BellIcon,
        },
    ]

    const estatistica = [
        {
            name: 'Machine Learning',
            description: 'Modelo preditivos baseados em aprendizado de máquina',
            href: '#',
            icon: ChartBarIcon,
        },
        {
            name: 'Rede Neural',
            description: 'Modelos preditivos baseados em Redes Neurais',
            href: '#',
            icon: BellIcon,
        },
        
        ]
    
    const inventario = [
        {
            name: 'Digitação de Arvores',
            description: 'Realizar cadastramento do invetário obtido em campo',
            href: '#',
            icon: ChartBarIcon,
        },
        {
            name: 'Linkar GPS',
            description: 'Linka as posições do GPS com as árvores',
            href: '#',
            icon: MapIcon,
            subMenuItems: [
                {
                    name: 'Cartesiano X e Y',
                    description: 'Usar Plano cartesiano',
                    href: '#',
                    icon: MapIcon,
                },
                {
                    name: 'GPS',
                    description: 'Linka as posições do GPS com as árvores',
                    href: '#',
                    icon: MapIcon,
                },
            ]
        },
        {
            name: 'Importar Inventário',
            description: 'Realizar importação de inventário a partir de um dataset',
            href: '#',
            icon: MenuIcon,
        },
    ]

    const custodia = [
        {
            name: 'Cadastro de Derrubada',
            description: 'Cadastro de Deburrada',
            href: '#',
            icon: PencilAltIcon,
        },
        {
            name: 'Cadastro de Toras',
            description: 'Cadastro de Toras',
            href: '#',
            icon: CursorClickIcon,
        },
        {
            name: 'Saída de de Toras',
            description: 'Saída de Toras',
            href: '#',
            icon: TableIcon,
        },
    ]

    const reports = [
        {
            name: 'Relatório de Espécies',
            // description: 'Cadastro de Deburrada',
            href: '#',
            icon: PencilAltIcon,
        },
        {
            name: 'Relatório de UTs',
            // description: 'Cadastro de Toras',
            href: '#',
            icon: CursorClickIcon,
        },
        {
            name: 'Relatório de Saída de Toras',
            // description: 'Saída de Toras',
            href: '#',
            icon: TableIcon,
        },
    ]

const Layout = ({ children }: props) => {
    const { data: session, status } = useSession()

    const defaultNavigation = [
        { name: 'Dashboard', href: '/', current: false, visible: !session, subMenu: false, subMenuItems: [] },
        { name: 'Soluções', href: '#', current: false, visible: !session, subMenu: true, subMenuItems: solutions },
        { name: 'Cadastro', href: '#', current: false, visible: !!session, subMenu: true, subMenuItems: resources },
        { name: 'Inventário', href: '#', current: false, visible: !!session, subMenu: true, subMenuItems: inventario },
        { name: 'Planejamento', href: '#', current: false, visible: !!session, subMenu: true, subMenuItems: planejamento },
        { name: 'Estatística', href: '#', current: false, visible: !!session, subMenu: true, subMenuItems: estatistica },
        { name: 'Cadeia de Custódia', href: '#', current: false, visible: !!session, subMenu: true, subMenuItems: custodia },
        { name: 'Relatórios', href: '#', current: false, visible: !!session, subMenu: true, subMenuItems: reports }
    ]

    const userNavigation = [
        { name: 'Perfil', href: '#' },
        { name: 'Alterar Senha', href: '/user/change-password' },
        { name: 'Logout', href: '#', click: () => signOut() },
    ]

    return (
        <div className="content font-roboto">
            <Navigation
                session={session}
                defaultNavigation={defaultNavigation}
                userNavigation={userNavigation}
            />
            <div className="lg:pt-14">
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default Layout