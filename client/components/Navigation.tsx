/* This example requires Tailwind CSS v2.0+ */
import { Fragment, SVGProps, useCallback, useContext, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition, Popover } from '@headlessui/react'
import { Link } from './Link'
import Logo from './Logo'
import { useSession, signOut, getSession } from 'next-auth/react'
import { MenuIcon, XIcon, BellIcon } from '@heroicons/react/outline'
import { ChevronDownIcon, ChevronUpIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { AuthContext } from '../contexts/AuthContext2'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import classNames from 'classnames'

type SubMenuType = {
        name?: string,
        description?: string,
        href?: string,
        subMenuItems?: SubMenuType[],
        icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element
    }
    type NavigationType = {
        name: string,
        href: string,
        current: boolean,
        visible: boolean,
        subMenu: boolean,
        subMenuItems?: SubMenuType[]
    }


// function classNames(...classes: any[]) {
//   return classes.filter(Boolean).join(' ')
// }

export default function Navigation({ session, defaultNavigation, userNavigation }: any) {
    // const { data: session, status } = useSession()
    const router = useRouter()

    const [navigation, setNavigation] = useState<NavigationType[]>([])
    const [sticky, setSticky] = useState(false)

    const handleScroll = () => {
        if (scrollY > 72) {
          setSticky(true);
        } else if (scrollY < 72) {
          setSticky(false);
        }
    }

    useEffect(() => {
        addEventListener('scroll', handleScroll)
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const changeCurrentParent = (key: any, href?: string) =>  {
        
        const changeCurrentNav = defaultNavigation.map((nav: any, index: any) => {
            if (key !== index) {
                return {
                    ...nav,
                    current: false
                }
            } else {
                return {
                    ...nav,
                    current: true
                }
            }
            
        })
        
        setNavigation(changeCurrentNav)
        if (href) router.push(href)
    }

    const checkCurrentNavigation = useCallback(() => {
            
            defaultNavigation?.map((nav: NavigationType, indexParent: number) => {
                if (nav?.subMenuItems) {
                    if (router.pathname === nav.href) {
                        return changeCurrentParent(indexParent)
                    }
                    nav.subMenuItems?.map((subMenu: SubMenuType, index: number) => {
                        if (router.pathname === subMenu.href) {
                            return changeCurrentParent(indexParent)
                        }
                    })
                }
            })
        
    }, [changeCurrentParent, defaultNavigation, router.pathname])
    

    useEffect(() => {
        setNavigation(defaultNavigation)
        if (session) {
            checkCurrentNavigation()
        }
    }, [session])

    return (
        <Disclosure as="nav" className={classNames(
                "lg:absolute items-center w-full opacity-100 z-50",
            )}
        >
          {({ open }) => (
            <>
              <div className={classNames(
                "px-4 sm:px-6 lg:px-8 bg-gray-50 shadow z-50",
                sticky ? 'lg:fixed w-full opacity-100 transition transition-ease duration-500 translate-y-0' : ''
              )
                }>
                <div className="flex items-center justify-between h-16">
                  <div className={classNames(
                    "flex items-center justify-between max-w-full w-full"
                  )}>
                    <div className="flex-shrink-0 lg:-mr-16">
                        <Link href="/">
                            <Logo width='w-10' height='h-10' />
                        </Link>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">

                    {navigation?.map((item: any, key: any) => (
                        item.visible && (!item.subMenu  ?
                        (<a
                            key={key}
                                href={item.href}
                                onClick={(evt: any) => {
                                    evt.preventDefault()
                                    changeCurrentParent(key, item.href)
                                    open = !open
                                }}
                                className={classNames(
                                item.current
                                ? 'border-b-2 border-green-700 text-gray-700 bg-gray-100'
                                : 'text-gray-700 hover:border-b-2 hover:border-green-700 hover:text-green-800 transition duration-500 ease-in-out hover:bg-gray-200 transform hover:-translate-y-1 hover:scale-105',
                              'px-6 py-2 text-sm font-medium hover:bg-gray-100 in-line flex'
                            )}
                                aria-current={item.current ? 'page' : undefined}
                          >
                                {item.name}
                        </a>) :
                            (<Menu
                                onClick={(evt: any) => {
                                    evt.preventDefault()
                                    changeCurrentParent(key)
                                }}
                                as="div" className={classNames(
                                item?.current
                                && 'border-b-2 border-green-700 text-gray-700 bg-gray-100',
                                "relative inline-block text-left")} key={key}>
                            {({ open }) => (
                            <>
                            <div>
                            <Menu.Button className={classNames(
                                !item?.current && 'hover:border-b-2 hover:border-green-700 hover:text-green-800',
                                    "inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700  transition duration-500 ease-in-out hover:bg-gray-200 transform hover:-translate-y-1 hover:scale-105")}>
                                {item.name}
                                <ChevronDownIcon
                                    className={classNames(
                                        open ? 'text-green-700' : 'text-gray-400',
                                        'w-5 h-5 ml-2 -mr-1'
                                    )}
                                    aria-hidden="true"
                                />
                                
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
                            <Menu.Items className={classNames(
                                "z-30 absolute w-72 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none")}>
                                {item.subMenuItems?.map((subMenu: SubMenuType, key: number) =>
                                (!subMenu.subMenuItems ?
                                    (<div className='px-2 py-2' key={key}>
                                        <Menu.Item key={key}>
                                            {({ active }) => (
                                                <Link
                                                    href={subMenu?.href}
                                                    className={classNames(
                                                        active ? 'bg-gray-100' : 'text-gray-800',
                                                        router.pathname === subMenu?.href && 'bg-gray-100',
                                                        'group flex rounded-md items-center w-full px-2 py-2 text-sm'
                                                    )}
                                                >
                                                    {subMenu?.icon && (
                                                        <subMenu.icon className="flex-shrink-0 h-6 w-6 text-green-700" aria-hidden="true" />
                                                    )}
                                                    <div className="ml-4" aria-hidden="true">
                                                        <p className="text-base font-medium text-gray-900">{subMenu.name}</p>
                                                        {subMenu?.description && (
                                                            <p className="mt-1 text-sm text-gray-500">{subMenu?.description}</p>
                                                        )}
                                                    </div>
                                                </Link>
                                            )}
                                        </Menu.Item>
                                    </div>  
                                ) :
                                (<div key={key}>
                                    <Menu>
                                        <div className='px-2 py-2 w-full'>
                                            <Menu.Button className={classNames(
                                                !subMenu.icon ? 'text-sm px-14' : '',
                                                "inline-flex w-full rounded-md px-4 py-2 text-sm font-medium text-gray-700  transition duration-500 ease-in-out hover:bg-gray-100")}
                                            >
                                                {subMenu?.icon && (
                                                    <subMenu.icon className="flex-shrink-0 h-6 w-6 text-green-700" aria-hidden="true" />
                                                )}
                                                <div className="ml-2" aria-hidden="true">
                                                    <p className="text-base font-medium text-gray-900">{subMenu.name}</p>
                                                    {/* {subMenu?.description && (
                                                        <p className="mt-1 text-sm text-gray-500">{subMenu?.description}</p>
                                                    )} */}
                                                </div>
                                                <div className='flex absolute right-0 mr-6'>
                                                    <ChevronRightIcon
                                                        className={classNames(
                                                            open ? 'text-green-700' : 'text-gray-400',
                                                            'w-5 h-5 ml-2 -mr-1'
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                </div>
                                            </Menu.Button>
                                    </div>
                                    <Transition
                                        enter="transition duration-100 ease-out"
                                        enterFrom="transform scale-95 opacity-0"
                                        enterTo="transform scale-100 opacity-100"
                                        leave="transition duration-75 ease-out"
                                        leaveFrom="transform scale-100 opacity-100"
                                        leaveTo="transform scale-95 opacity-0"
                                    ></Transition>
                                        <Menu.Items className={classNames(
                                            "z-30 absolute -mr-8 -mt-12 w-72 -right-60 origin-left bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none")}>
                                            {subMenu.subMenuItems?.map((subsubMenu: SubMenuType, subKey: number) => (
                                                // eslint-disable-next-line react/jsx-key
                                                <div className='px-2 py-2' key={subKey}>
                                            <Menu.Item key={subKey}>
                                                {({ active }) => (
                                                    <Link
                                                        href={subMenu?.href}
                                                        className={classNames(
                                                            active ? 'bg-gray-100' : 'text-gray-800',
                                                            router.pathname === subMenu?.href && 'bg-gray-100',
                                                            'group flex rounded-md items-center w-full px-2 py-2 text-sm'
                                                        )}
                                                    >
                                                        {subsubMenu?.icon && (
                                                            <subsubMenu.icon className="flex-shrink-0 h-6 w-6 text-green-700" aria-hidden="true" />
                                                        )}
                                                        <div className="ml-4" aria-hidden="true">
                                                            <p className="text-base font-medium text-gray-900">{subsubMenu.name}</p>
                                                            {subsubMenu?.description && (
                                                                <p className="mt-1 text-sm text-gray-500">{subsubMenu?.description}</p>
                                                            )}
                                                        </div>
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                        </div>  
                                            ))}
                                        </Menu.Items>
                                    </Menu>
                                </div>  
                            ))
                        )}
                    </Menu.Items>
                </Transition>
            </>
        )}

        </Menu>
        ))))
        }
        </div>
        </div>
            <div className='hidden lg:flex lg:flex-row'>
                {!session && (
                <div className="px-2 lg:space-x-2">
                    <Link href="/login" className="bg-green-700 shadow text-sm px-6 py-3 
                    text-white rounded-lg hover:text-white transition duration-500 ease-in-out hover:bg-green-600
                    transform hover:-translate-y-1 hover:scale-105">
                        Fazer login
                    </Link>  
                    <Link href="/signup" className="bg-gray-100 shadow text-sm px-6 py-3
                    text-green-700 rounded-lg hover:text-green-600 transition duration-500 ease-in-out hover:bg-gray-200
                    transform hover:-translate-y-1 hover:scale-105">
                        Cadastre-se
                    </Link>           
                </div>            
            )}
        </div>
                
        </div>
            {session && (<div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                    <button
                    type="button"
                    className="bg-gray-200 p-1 rounded-full text-gray-700 hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-800 focus:ring-white"
                    >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative">
                    <div>
                        <Menu.Button className="max-w-xs bg-gray-700 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-700 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            <img className="h-8 w-10 rounded-full" src={ session && session.user?.image !== null ? session.user?.image || 'https://img.icons8.com/office/80/000000/administrator-male--v1.png' : '' } alt="" />
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
                        <Menu.Items className="origin-top-right absolute z-20 right-0 mt-2 w-48 shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNavigation.map((item: any, key: any) => (
                            <Menu.Item key={key}>
                            {({ active }) => (
                                <a
                                href={item.href}
                                className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                )}
                                        onClick={item.click}
                                        aria-hidden="true"
                                >
                                {item.name}
                                </a>
                            )}
                            </Menu.Item>
                        ))}
                        </Menu.Items>
                        
                    </Transition>
                    </Menu>
                </div>
                </div>
                )}
                <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="bg-gray-200 inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-700 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                </Disclosure.Button>
                </div>
            </div>
            </div>

            <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navigation.map((item, key) => (
                item.visible &&
                (!item.subMenu ?    
                (<Disclosure.Button
                    key={key}
                    as="a"
                    href={item.href}
                    className={classNames(
                    item.current ? 'bg-green-700 text-white' : 'text-gray-700 hover:bg-green-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium transition-all'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                >
                    {item.name}
                </Disclosure.Button>) :
                    (<Popover as="div" className="w-full" key={key}>
                            {({ open }) => (
                        <>
                        <div>
                        <Popover.Button className="inline-flex w-full rounded-md px-3 py-2 font-medium text-gray-700 hover:text-white transition duration-500 ease-in-out hover:bg-green-700">
                            {item.name}
                            {open ? (
                            <ChevronUpIcon
                                className={classNames(
                                    open ? 'text-gray-400' : 'text-gray-400',
                                    'w-5 h-5 ml-4 -mr-1'
                                )}
                                aria-hidden="true"
                            />                    
                            ) : (
                                <ChevronDownIcon
                                className={classNames(
                                    open ? 'text-gray-400' : 'text-gray-400',
                                    'w-5 h-5 ml-4 -mr-1'
                                )}
                                aria-hidden="true"
                            />                    
                            )}
                            
                        </Popover.Button>
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
                        <Popover.Panel className="z-30 relative lg:right-0 w-full mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {item.subMenuItems?.map((subMenu, key) =>
                            (<div className='px-2 py-2' key={key} aria-hidden="true">
                                <Link
                                    href={subMenu.href}
                                    className={classNames(
                                        'hover:bg-gray-100',
                                        'group flex rounded-md items-center w-full px-2 py-2 text-sm'
                                    )}
                                    aria-hidden="true"
                                >
                                    {subMenu?.icon && (
                                        <subMenu.icon className="flex-shrink-0 h-6 w-6 text-green-700" aria-hidden="true" />
                                    )}
                                    <div className="ml-4">
                                        <p className="text-base font-medium text-gray-900">{subMenu.name}</p>
                                        {subMenu?.description && (
                                            <p className="mt-1 text-sm text-gray-500">{subMenu?.description}</p>
                                        )}
                                    </div>
                                </Link>

                            </div>  
                        ))}
                    </Popover.Panel>
                </Transition>
                </>
            )}
    
            </Popover>
                ))
            ))}
                        
            </div>
            {session ? (
                <div className="pt-4 pb-3 border-t border-gray-700">
                    <div className="flex items-center px-5">
                        <div className="flex-shrink-0">
                        <img className="h-10 w-10 rounded-full" src={ session && session.user?.image !== null ? session.user?.image || 'https://img.icons8.com/office/80/000000/administrator-male--v1.png' : '' } alt="" />
                        </div>
                    <div className="ml-3">
                        <div className="text-base font-medium leading-none text-gray-600">{session && session.user?.name}</div>
                        <div className="text-sm font-medium leading-none text-gray-400">{session && session.user?.email}</div>
                    </div>
                    <button
                    type="button"
                    className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className="mt-3 px-2 space-y-1" aria-hidden="true">
                    {userNavigation.map((item: any, key: any) => (
                    <Link
                        key={key}
                        as="a"
                        href={item.href}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-green-700"
                        onClick={item.click}
                        aria-hidden="true"
                    >
                        {item.name}
                    </Link>
                    ))}
                </div>
            </div>
            ) : (
                <div className="px-3 pb-2 -mt-1">
                    <Link href="/login" className="block px-2 py-2 rounded-md text-base text-gray-700 hover:text-white hover:bg-green-700 hover:transition-all">Login</Link>            
                </div>            
            )}
            </Disclosure.Panel>
        </>
        )}
    </Disclosure>
  )
}
