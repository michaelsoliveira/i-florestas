import { ReactNode, useCallback, useContext, useEffect, useState, useLayoutEffect } from "react"
import Navigation from './Navigation'
import Footer from './Footer'
import { useSession, signOut } from "next-auth/react"
import { custodia, estatistica, inventario, planejamento, reports, resources, solutions } from "./Menus"
import { Loading } from "@/components/Loading"
import { LoadingContext } from "contexts/LoadingContext"
import { ProjetoContext } from "contexts/ProjetoContext"
import { ClipboardListIcon } from '@heroicons/react/outline'
import { AuthContext } from "contexts/AuthContext"
import { CogIcon, UserGroupIcon } from '@heroicons/react/outline'

export type props = {
    children: ReactNode
}

const Layout = ({ children }: props) => {
    const { data: session, status } = useSession()
    const user = session?.user
    const { loading } = useContext(LoadingContext)
    const { projeto, setProjeto } = useContext(ProjetoContext)
    const { client } = useContext(AuthContext)

    const getProjetoAtivo = useCallback(async () => {
        if (session) {
            const { data } = await client.get(`/projeto/active/get`)
            setProjeto(data)
        }
            
        
    }, [session, client, setProjeto])

    useEffect (() => {
        getProjetoAtivo()
        
    }, [getProjetoAtivo])

    const withProjeto = projeto ? 
        [
            {
                name: 'Geral',
                description: 'Gerenciar Informações do Projeto',
                href: `/projeto`,
                icon: CogIcon
            },
            {
                name: 'Detentor',
                description: 'Gerenciar Detentor do Projeto',
                href: `/projeto/detentor`,
            },
            {
                name: 'Usuários',
                description: 'Gerenciar Permissões',
                href: `/projeto/users`,
                icon: UserGroupIcon
            },
            {
                name: 'Equações',
                description: 'Gerenciar Equações',
                href: `/projeto/equacao`,
            },
        ]
     : [
        {
            name: 'Geral',
            description: 'Gerenciar Informações do Projeto',
            href: `/projeto`,
            icon: CogIcon
        }
     ]

    const menuProjeto = {
        name: 'Projeto',
        description: 'Dados Gerais dos Projetos',
        href: '/projeto',
        icon: ClipboardListIcon,
        subMenuItems: withProjeto
    }

    const defaultNavigation = [
        { name: 'Dashboard', href: '/', current: false, visible: !session, subMenu: false, subMenuItems: [] },
        { name: 'Soluções', href: '#', current: false, visible: !session, subMenu: true, subMenuItems: solutions },
        { name: 'Cadastro', href: '#', current: false, visible: !!session, subMenu: true, subMenuItems: [ menuProjeto, ...resources] },
        { name: 'Inventário', href: '#', current: false, visible: !!session, subMenu: true, subMenuItems: inventario },
        { name: 'Planejamento', href: '#', current: false, visible: !!session, subMenu: true, subMenuItems: planejamento },
        { name: 'Estatística', href: '#', current: false, visible: !!session, subMenu: true, subMenuItems: estatistica },
        { name: 'Cadeia de Custódia', href: '#', current: false, visible: !!session, subMenu: true, subMenuItems: custodia },
        { name: 'Relatórios', href: '#', current: false, visible: !!session, subMenu: true, subMenuItems: reports }
    ]

    const userNavigation = [
        { name: `Perfil (${user?.username})`, href: '#' },
        { name: 'Alterar Senha', href: '/user/change-password' },
        { name: 'Logout', href: '#', click: () => signOut({ callbackUrl: "/" }) },
    ]

    return (
        <div className="">
            
            <div>
                <Navigation
                    defaultNavigation={defaultNavigation}
                    userNavigation={userNavigation}
                />
            </div>
            <div className="relative lg:pt-14">
                {loading && (<Loading />)}
                {children}
            </div>
            <div className="">
                <Footer />
            </div>
        </div>
    )
}

export default Layout