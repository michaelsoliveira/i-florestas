'use client'

import { Fragment, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react"
import Footer from '../footer'
import { useSession, signOut } from "next-auth/react"
import { custodia, estatistica, inventario, planejamento, reports, resources, solutions } from "./Menus"
import { Loading } from "./Loading"
import { LoadingContext } from "@/context/LoadingContext"
import { ProjetoContext } from "@/context/ProjetoContext"
import { AuthContext } from "@/context/AuthContext"
import { CogIcon, UserGroupIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/outline'
import { usePathname } from 'next/navigation'
import Script from 'next/script'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { Menu, Transition } from "@headlessui/react"
import classNames from "./classNames"
import alertService from "@/services/alert"
import { init } from "@socialgouv/matomo-next"
import { PoaContext, initialPoa } from "@/context/PoaContext"
// import dynamic from 'next/dynamic'
// const Navigation = dynamic(() => import('./Navigation'))
import Navigation from "./Navigation"

export type props = {
    children: ReactNode
}

const MATOMO_URL = process.env.MATOMO_URL || process.env.NEXT_PUBLIC_MATOMO_URL;
const MATOMO_ID = process.env.MATOMO_ID || process.env.NEXT_PUBLIC_MATOMO_ID;
const PHONE_NUMBER = process.env.NEXT_PUBLIC_APP_WHATSAPP
const MESSAGE_TEXT = "Gostaria de mais informações sobre o projeto BOManejo Web"

const Layout = ({ children }: props) => {
    const { data: session, status } = useSession()
    const user = session?.user
    const { loading } = useContext(LoadingContext)
    const { projeto, setProjeto } = useContext(ProjetoContext)
    const { poa, setPoa } = useContext(PoaContext)
    const { client } = useContext(AuthContext)
    const pathName: string = usePathname()
    const [defaultNavigation, setDefaultNavigation] = useState<any>()
    const poaRequire = pathName === '/process'

    const getProjetoAndPoa = useCallback(async () => {
        try {
            if (session) {
                const resProjeto = await client.get(`/projeto/active/get`)
                const resPoa = await client.get(`/poa/active/get`)
                const { projeto } = resProjeto.data
                const { poa } = resPoa.data
                setProjeto(projeto ? projeto : { id: '', nome: 'Nenhum Projeto Cadastrado' })
                setPoa(poa ? poa : initialPoa)
            }
        } catch(error: any) {
            console.log(error.message)
        }
       
    }, [session, client, setProjeto, setPoa])

    useEffect (() => {
        getProjetoAndPoa()
    }, [getProjetoAndPoa])

    const withProjeto = useMemo(() => projeto ? 
        [
            {
                name: 'Gerenciar',
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
                name: 'Mudar Projeto Ativo',
                description: '',
                href: `#`,
                icon: ArrowsRightLeftIcon
            },
        ]
     : [
        {
            name: 'Geral',
            description: 'Gerenciar Informações do Projeto',
            href: `/projeto`,
            icon: CogIcon
        }
    ], [projeto])

    const userNavigation = [
        { name: `Perfil (${user?.username})`, href: '#' },
        { name: 'Alterar Senha', href: '/user/change-password' },
        { name: 'Logout', href: '#', click: () => signOut({ redirect: true, callbackUrl: process.env.NEXTAUTH_URL }) },
    ]

    const loadNavigation = useCallback(() => {
        const navigation = session ? [
            { name: 'Projeto', href: '#', current: false, subMenu: true, subMenuItems: withProjeto },
            { name: 'Cadastro', href: '#', current: false, subMenu: true, subMenuItems: resources },
            { name: 'Inventário', href: '#', current: false, subMenu: true, subMenuItems: inventario },
            { name: 'Planejamento', href: '#', current: false, subMenu: true, subMenuItems: planejamento },
            { name: 'Análise de Dados', href: '#', current: false, subMenu: true, subMenuItems: estatistica },
            { name: 'Cadeia de Custódia', href: '#', current: false, subMenu: true, subMenuItems: custodia },
            { name: 'Relatórios', href: '#', current: false, subMenu: true, subMenuItems: reports }
        ] 
        : [{ name: 'Dashboard', href: '/', current: false, subMenu: false, subMenuItems: [] },
        { name: 'Soluções', href: '#', current: false, subMenu: true, subMenuItems: solutions }]
        
        setDefaultNavigation(navigation)
    }, [session, withProjeto])

    useEffect(() => {
        init({ url: MATOMO_URL!, siteId: MATOMO_ID! });
        loadNavigation()
      }, [loadNavigation])

    return (
        <>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-6GKM1MGNL6" />
        <Script id="google-analytics"> 
            {
                `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
        
                    gtag('config', 'G-6GKM1MGNL6');
                `
            }
        </Script> 
    
            <div className="flex flex-col">
                <div className="lg:mb-16">
                    <Navigation
                        defaultNavigation={defaultNavigation}
                        userNavigation={userNavigation}
                        withIcons={true}
                    />
                    
                </div>
                    { (poaRequire && !poa?.id) && (
                        <div>
                            <span className="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3" role="alert">
                                <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
                                <p>Para realizar o processamento do inventário é necessário ativar um POA!</p>
                            </span>
                        </div>
                    )}
                
                <div>
                    {loading && (<Loading />)}
                    {children}
                </div>
                <div>
                    <Footer />
                </div>
            </div>
            <div>
            <Menu as="div" className="fixed float-right right-5 bottom-5 md:right-8 md:bottom-8 z-50">
                <div>
                    <Menu.Button className="rounded-full flex items-center hover:cursor-pointer text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-700 focus:ring-white">
                        <div
                            className="px-3 py-1 bg-brown-normal hover:opacity-75 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-800 focus:ring-white"
                        >
                            <FontAwesomeIcon size="2x" icon={faQuestion} />
                        </div>
                    </Menu.Button>
                </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="-top-2 transform -translate-y-full absolute right-0 w-36 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="p-1">
                                {["Tutorial", "SAC"].map((item: any, key: any) => (
                                    <Menu.Item key={key}>
                                    {({ active }) => (
                                        <Menu.Button
                                            as='a'
                                            href="#"
                                            className={classNames(
                                                active ? 'bg-custom-green/75 text-white' : 'text-gray-900',
                                                'group flex w-full items-center rounded-md px-2 py-2 text-sm'
                                            )}
                                            onClick={(e) => { 
                                                e.preventDefault()
                                                const whatsAppUrl = `http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${MESSAGE_TEXT}`
                                                key === 0 ?
                                                alertService.info('Tutorial em Desenvolvimento') :
                                                window.open(whatsAppUrl)
                                                
                                            }}
                                            aria-hidden="true"
                                            target="_blank"
                                        >
                                            {item}
                                        </Menu.Button>
                                    )}
                                    </Menu.Item>
                                ))}
                            </div>
                        </Menu.Items>
                        
                    </Transition>
                </Menu>
            </div>
        </>
    )
}

export default Layout