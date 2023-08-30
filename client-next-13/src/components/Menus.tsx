import {
    BookmarkIcon,
    CalendarIcon,
    CogIcon,
    ChartBarIcon,
    ArrowPathRoundedSquareIcon,
    DocumentArrowDownIcon,
    RectangleGroupIcon,
    PencilSquareIcon,
    PencilIcon,
    GlobeAmericasIcon,
    ShieldCheckIcon,
    ClipboardDocumentIcon,
    BellIcon,
    TableCellsIcon,
    TagIcon,
    GlobeAltIcon,
    CalculatorIcon,
    MapIcon
} from '@heroicons/react/24/outline'
import { DocumentTextIcon } from '@heroicons/react/24/solid'

export const resources = [
    {
        name: 'UMF',
        description: 'Unidade de Manejo Florestal',
        href: '/umf',
        icon: ClipboardDocumentIcon,
    },
    {
        name: 'UPA',
        description: 'Unidade de Produção Anual',
        href: '/upa',
        icon: BookmarkIcon,
    },
    {
        name: 'Equação de Volume',
        description: 'Equações de Volumes',
        href: '/equacao',
        icon: CalculatorIcon,
    },
    {
        name: 'UT',
        description: 'Unidade de Trabalho',
        href: '/ut',
        icon: CalendarIcon,
    },
    {
        name: 'Observações',
        description: 'Observações Padronizadas',
        href: '/obs-arvore',
        faIcon: true,
        icon: DocumentTextIcon,
    },
    {
        name: 'Especies',
        description: 'Espécies Existentes',
        href: '/especie',
        icon: PencilIcon,
    },
    {
        name: 'Categoria de Espécies',
        description: 'Critérios de seleção',
        href: '/categoria-especie',
        icon: RectangleGroupIcon,
    },
    {
        name: 'Grupo Categoria de Espécies',
        description: 'Relaciona Categoria -> Espécie',
        href: '/categoria-especie/grupo',
        icon: CogIcon,
    }

]

export const solutions = [
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
        icon: ArrowPathRoundedSquareIcon,
    },
    { name: 'Segurança', description: "Your customers' data will be safe and secure.", href: '#', icon: ShieldCheckIcon },
    {
        name: 'Integração com GIS',
        description: "Connect with third-party tools that you're already using.",
        href: '#',
        icon: MapIcon,
    },
    {
        name: 'Mapeamento',
        description: 'Build strategic funnels that will drive your customers to convert',
        href: '#',
        icon: GlobeAmericasIcon,
    },
]

export const planejamento = [
{
    name: 'Cadastro do POA',
    description: 'Planejamento Operacional Anual',
    href: '/poa',
    icon: GlobeAltIcon,
},
{
    name: 'Seleção de Árvores',
    description: 'Seleção de Árvores do POA',
    href: '/process',
    icon: TagIcon,
    },
]

export const estatistica = [
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

export const inventario = [
    {
        name: 'Digitação de Arvores',
        description: 'Realizar cadastramento do invetário obtido em campo',
        href: '/arvore',
        icon: ChartBarIcon,
    },
    //{
    //    name: 'Linkar GPS',
    //    description: 'Linka as posições do GPS com as árvores',
    //    href: '#',
    //    icon: MapIcon
    //},
    {
        name: 'Importar Inventário',
        description: 'Realizar importação de inventário a partir de um dataset',
        href: '/inventario',
        icon: DocumentArrowDownIcon,
    },
]

export const custodia = [
    {
        name: 'Cadastro de Derrubada',
        description: 'Cadastro de Deburrada',
        href: '#',
        icon: PencilSquareIcon,
    },
    {
        name: 'Cadastro de Toras',
        description: 'Cadastro de Toras',
        href: '#',
        icon: ArrowPathRoundedSquareIcon,
    },
    {
        name: 'Saída de de Toras',
        description: 'Saída de Toras',
        href: '#',
        icon: TableCellsIcon,
    },
]

export const reports = [
    {
        name: 'Relatório de Espécies',
        // description: 'Cadastro de Deburrada',
        href: '#',
        icon: PencilSquareIcon,
    },
    {
        name: 'Relatório de UTs',
        // description: 'Cadastro de Toras',
        href: '#',
        icon: ArrowPathRoundedSquareIcon,
    },
    {
        name: 'Relatório de Saída de Toras',
        // description: 'Saída de Toras',
        href: '#',
        icon: TableCellsIcon,
    },
]