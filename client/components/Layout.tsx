import { ReactNode, useContext, useEffect } from "react"
import Navigation from './Navigation'
import Footer from './Footer'
import { useSession, signOut } from "next-auth/react"
import { custodia, estatistica, inventario, planejamento, reports, resources, solutions } from "./Menus"
import { Loading } from "@/components/Loading"
import { LoadingContext } from "contexts/LoadingContext"

export type props = {
    children: ReactNode
}

const Layout = ({ children }: props) => {
    const { data: session, status } = useSession()
    const user = session?.user
    const { loading } = useContext(LoadingContext)

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