'use client';

/* eslint-disable @next/next/no-img-element */
/* This example requires Tailwind CSS v2.0+ */
import {
  createRef,
  Fragment,
  SVGProps,
  useCallback,
  useContext,
  useEffect,
  useState,
  forwardRef,
  useRef,
} from 'react';
import { Disclosure, Menu, Transition, Popover } from '@headlessui/react';
import { Link } from './Link';
import Logo from './Logo';
import { useSession } from 'next-auth/react';
import { Bars3Icon, XMarkIcon, UserIcon } from '@heroicons/react/24/outline';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/solid';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import { ProjetoContext } from '@/context/ProjetoContext';
import { useModalContext } from '@/context/ModalContext';
import { ChangeActive as ChangeActiveProjeto } from '@/components/projeto/ChangeActive';
import { ChangeActive as ChangeActivePoa } from '@/components/poa/ChangeActive';
import { styles } from '@/components/utils/styles';
import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline';
import SubMenuNavigation from './SubMenuNavigation';
import Tabs from './Tabs';
import Image from 'next/legacy/image';
import { PoaContext } from '@/context/PoaContext';

type SubMenuType = {
  name?: string;
  description?: string;
  href?: string;
  subMenuItems?: SubMenuType[];
  icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  faIcon?: boolean;
  event?: any;
};
type NavigationType = {
  name: string;
  href: string;
  current: boolean;
  subMenu: boolean;
  subMenuItems?: SubMenuType[];
};

const NOT_DISPLAY_OPTIONS = ['Mudar Projeto Ativo', 'Mudar Poa Ativo'];

export default function Navigation({
  defaultNavigation,
  userNavigation,
  withIcons = false,
}: any) {
  const { data: session, status } = useSession() as any;
  const pathname = usePathname();
  const { showModal } = useModalContext();
  const formRefProjeto = createRef<any>();
  const formRefPoa = createRef<any>();
  const { projeto } = useContext(ProjetoContext);
  const { poa } = useContext(PoaContext);
  const animation = true;
  const [navigation, setNavigation] = useState<NavigationType[]>();
  const [sticky, setSticky] = useState(false);

  const changeProjetoAtivo = async () => {
    formRefProjeto.current.handleSubmit();
  };

  const changePoaAtivo = async () => {
    formRefPoa.current.handleSubmit();
  };

  const changeProjetoModal = () => {
    showModal({
      title: 'Alterar Projeto Ativo',
      onConfirm: changeProjetoAtivo,
      styleButton: styles.greenButton,
      confirmBtn: 'Ativar Projeto',
      content: <ChangeActiveProjeto ref={formRefProjeto} />,
    });
  };

  const changePoaModal = () => {
    showModal({
      title: 'Alterar Poa Ativo',
      onConfirm: changePoaAtivo,
      styleButton: styles.greenButton,
      confirmBtn: 'Ativar Poa',
      content: <ChangeActivePoa ref={formRefPoa} />,
    });
  };

  const openModal = (name?: string) => {
    switch (name) {
      case 'Mudar Projeto Ativo':
        changeProjetoModal();
        break;
      case 'Mudar Poa Ativo':
        changePoaModal();
        break;
      default:
        return;
    }
  };

  const showLogin = (index: number) => {
    showModal({
      type: 'submit',
      hookForm: 'hook-form',
      options: false,
      content: <Tabs index={index} />,
    });
  };

  const handleScroll = () => {
    if (scrollY > 100) {
      setSticky(true);
    } else if (scrollY < 100) {
      setSticky(false);
    }
  };

  useEffect(() => {
    addEventListener('scroll', handleScroll);

    return () => {
      removeEventListener('scroll', handleScroll);
    };
  }, []);

  const changeCurrentParent = useCallback(
    (key?: any, href?: string) => {
      const changeCurrentNav = defaultNavigation.map((nav: any, index: any) => {
        if (key !== index) {
          return {
            ...nav,
            current: false,
          };
        } else {
          return {
            ...nav,
            current: true,
          };
        }
      })

      setNavigation(changeCurrentNav);
    },
    [defaultNavigation]
  );

  const checkCurrentNavigation = useCallback(() => {
    defaultNavigation?.map((nav: NavigationType, indexParent: number) => {
      if (nav?.subMenuItems) {
        if (pathname === nav.href) {
          changeCurrentParent(indexParent);
        }
        nav?.subMenuItems?.map((subMenu: any, indexSub: number) => {
          if (pathname === subMenu?.href.split("?")[0]) {
            
            changeCurrentParent(indexParent);
          }

          subMenu.subMenuItems?.map(
            (subsubMenu: SubMenuType, indexSubsub: number) => {
              if (pathname === subsubMenu.href) {
                changeCurrentParent(indexParent);
              }
            }
          );
        });
      }
    });
  }, [changeCurrentParent, defaultNavigation, pathname]);

  useEffect(() => {
    setNavigation(defaultNavigation)
  }, [defaultNavigation])

  useEffect(() => {
    checkCurrentNavigation();
  }, [checkCurrentNavigation]);

  return (
    <Disclosure
      as="nav"
      className={classNames('lg:absolute items-center w-full opacity-100 z-40')}
    >
      {({ open }) => (
        <>
          <div
            className={classNames(
              'px-4 sm:px-6 lg:px-8 bg-gray-light shadow z-40',
              sticky
                ? 'lg:fixed w-full opacity-100 transition-all duration-1000 translate-y-0'
                : ''
            )}
          >
            <div className="flex items-center justify-between h-16">
              <div
                className={classNames(
                  'flex items-center justify-between max-w-full w-full'
                )}
              >
                <div>
                  {open ? (
                    <Disclosure.Button as={Link} href="/">
                      <Image
                        src="/imgs/logo_bomanejo.png"
                        alt="Logo"
                        width="30"
                        height="30"
                      />
                    </Disclosure.Button>
                  ) : (
                    <Link href="/">
                      <Image
                        src="/imgs/logo_bomanejo.png"
                        alt="Logo"
                        width="35"
                        height="35"
                      />
                    </Link>
                  )}
                </div>
                <div className="hidden md:block relative">
                  <div className="flex flex-wrap space-x-2 w-full ml-0">
                    {navigation?.map(
                      (item: any, key: any) =>
                        // item.visible &&
                        (!item.subMenu ? (
                          <Link
                            key={key}
                            href={item.href}
                            onClick={(evt: any) => {
                              changeCurrentParent(key, item.href);
                              open = !open;
                            }}
                            className={classNames(
                              item.current
                                ? 'border-b-2 border-custom-green bg-gray-light'
                                : 'hover:border-b-2 hover:border-custom-green',
                              animation &&
                                'transform hover:-translate-y-1 hover:scale-105 transition-all duration-500 ease-in-out',
                              'text-custom-green px-6 py-2 font-medium text-sm hover:bg-gray-normal in-line flex'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </Link>
                        ) : (
                          <Popover
                            onClick={(evt: any) => {
                              evt.preventDefault();
                              changeCurrentParent(key);
                            }}
                            as="div"
                            className={classNames(
                              item?.current &&
                                'border-b-4 border-custom-green font-medium text-gray-700 bg-gray-100',
                              'text-left'
                            )}
                            key={key}
                          >
                            {({ open, close }) => (
                              <>
                                <Popover.Button
                                  className={classNames(
                                    !item?.current &&
                                      'hover:border-b-4 hover:border-custom-green hover:text-custom-green',
                                    'inline-flex justify-center font-medium w-full px-4 py-2 text-sm text-custom-green hover:bg-gray-normal',
                                    animation &&
                                      'transform hover:-translate-y-1 hover:scale-105 transition-all duration-500 ease-in-out opacity-100'
                                  )}
                                >
                                  {item.name}
                                  <ChevronDownIcon
                                    className={classNames(
                                      open
                                        ? 'text-custom-green rotate-180 transform'
                                        : 'text-gray-dark',
                                      'w-5 h-5 ml-2 -mr-1'
                                    )}
                                    aria-hidden="true"
                                  />
                                </Popover.Button>
                                <Transition
                                  as={Fragment}
                                  show={open}
                                  enter="transition ease-out duration-300"
                                  enterFrom="transform opacity-0 scale-75"
                                  enterTo="transform opacity-100 scale-100"
                                  leave="transition ease-in duration-300"
                                  leaveFrom="transform opacity-100 scale-100"
                                  leaveTo="transform opacity-0 scale-75"
                                >
                                  <Popover.Panel
                                    className={classNames(
                                      'z-30 flex flex-wrap fixed mt-3 w-screen bg-gray-normal shadow-lg left-0'
                                    )}
                                  >
                                    {item.subMenuItems?.map(
                                      (subMenu: any, key: number) =>
                                        !subMenu.subMenuItems ? (
                                          <div
                                            key={key}
                                            className="flex flex-row px-2 py-2 rounded-md text-sm text-gray-dark "
                                          >
                                            <Popover.Button
                                              as={Link}
                                              href={subMenu?.href}
                                              className={classNames(
                                                pathname === subMenu?.href.split("?")[0] &&
                                                  'bg-gray-100',
                                                'group flex rounded-md text-start font-medium items-center px-2 py-2 text-sm transition duration-500 ease-in-out hover:bg-gray-100'
                                              )}
                                              onClick={() =>
                                                openModal(subMenu.name)
                                              }
                                            >
                                              {withIcons && subMenu?.icon && (
                                                <subMenu.icon
                                                  className="flex-shrink-0 h-6 w-6 text-green-700"
                                                  aria-hidden="true"
                                                />
                                              )}

                                              <div
                                                className="flex flex-col justify-center ml-4"
                                                aria-hidden="true"
                                              >
                                                <SubMenuNavigation
                                                  subMenu={subMenu}
                                                />
                                              </div>
                                            </Popover.Button>
                                          </div>
                                        ) : (
                                          <div
                                            key={key}
                                            className="flex flex-row"
                                          >
                                            <Popover>
                                              {({
                                                open: menuOpen,
                                                close: menuClose,
                                              }) => (
                                                <>
                                                  <div className="px-2 py-2 text-start">
                                                    <Popover.Button
                                                      className={classNames(
                                                        !subMenu.icon
                                                          ? 'text-sm px-14'
                                                          : '',
                                                        'rounded-md px-2 py-2 text-sm text-gray-700 transition duration-500 ease-in-out hover:bg-gray-100'
                                                      )}
                                                    >
                                                      {withIcons &&
                                                        subMenu?.icon && (
                                                          <subMenu.icon
                                                            className="flex-shrink-0 h-6 w-6 text-green-700"
                                                            aria-hidden="true"
                                                          />
                                                        )}
                                                      <div
                                                        className="ml-4"
                                                        aria-hidden="true"
                                                      >
                                                        <p className="text-base font-medium text-gray-900">
                                                          {subMenu.name}
                                                        </p>
                                                      </div>
                                                      <div className="flex absolute right-0 mr-6">
                                                        <ChevronRightIcon
                                                          className={classNames(
                                                            menuOpen
                                                              ? 'text-green-700 rotate-180 transform'
                                                              : 'text-gray-400',
                                                            'w-5 h-5 ml-2 -mr-1 transition-all'
                                                          )}
                                                          aria-hidden="true"
                                                        />
                                                      </div>
                                                    </Popover.Button>
                                                  </div>
                                                  <Transition
                                                    show={menuOpen}
                                                    enter="transition duration-100 ease-out"
                                                    enterFrom="transform scale-95 opacity-0"
                                                    enterTo="transform scale-100 opacity-100"
                                                    leave="transition duration-75 ease-out"
                                                    leaveFrom="transform scale-100 opacity-100"
                                                    leaveTo="transform scale-95 opacity-0"
                                                  ></Transition>
                                                  <Popover.Panel
                                                    className={classNames(
                                                      'z-30 absolute -mr-8 -mt-12 w-72 -right-60 origin-left bg-white divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none'
                                                    )}
                                                  >
                                                    {subMenu.subMenuItems?.map(
                                                      (
                                                        subsubMenu: SubMenuType,
                                                        subKey: number
                                                      ) => (
                                                        <div
                                                          key={subKey}
                                                          className="inline-flex px-2 py-2 w-full rounded-md text-sm text-gray-700"
                                                        >
                                                          <Popover.Button
                                                            as={Link}
                                                            href={
                                                              subsubMenu?.href
                                                            }
                                                            onClick={close}
                                                            className={classNames(
                                                              !subsubMenu?.icon &&
                                                                'pl-8',
                                                              pathname ===
                                                                subsubMenu?.href &&
                                                                'bg-gray-100',
                                                              'group flex rounded-md text-start items-center w-full px-2 py-2 text-sm transition duration-500 ease-in-out hover:bg-gray-100'
                                                            )}
                                                          >
                                                            {subsubMenu?.icon && (
                                                              <subsubMenu.icon
                                                                className="flex-shrink-0 h-6 w-6 text-green-700"
                                                                aria-hidden="true"
                                                              />
                                                            )}
                                                            <div
                                                              className="ml-4"
                                                              aria-hidden="true"
                                                            >
                                                              <p className="text-sm text-gray-900">
                                                                {
                                                                  subsubMenu.name
                                                                }
                                                              </p>
                                                              {subsubMenu?.description && (
                                                                <p className="mt-1 text-sm text-gray-500">
                                                                  {
                                                                    subsubMenu?.description
                                                                  }
                                                                </p>
                                                              )}
                                                            </div>
                                                          </Popover.Button>
                                                        </div>
                                                      )
                                                    )}
                                                  </Popover.Panel>
                                                </>
                                              )}
                                            </Popover>
                                          </div>
                                        )
                                    )}
                                  </Popover.Panel>
                                </Transition>
                              </>
                            )}
                          </Popover>
                        ))
                    )}
                  </div>
                </div>
                <div className="hidden lg:flex lg:flex-row">
                  {!session && (
                    <div className="px-2 lg:space-x-2">
                      <button
                        className="bg-custom-green shadow text-sm px-6 py-3 
                        text-white rounded-lg hover:text-white transition duration-500 ease-in-out hover:opacity-75
                        transform hover:-translate-y-1 hover:scale-105"
                        onClick={() => showLogin(0)}
                      >
                        Fazer login
                      </button>
                      <button
                        className="bg-gray-light shadow text-sm px-6 py-3
                        text-custom-green rounded-lg hover:text-custom-green transition duration-500 ease-in-out hover:bg-gray-100
                        transform hover:-translate-y-1 hover:scale-105"
                        onClick={() => showLogin(1)}
                      >
                        Cadastre-se
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {session && (
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-2">
                    {
                      // Projeto e POA Vigente

                      <div className="flex flex-col text-xs w-44 text-gray-700 border p-1 border-gray-400 rounded-lg">
                        <div>
                          Projeto:{' '}
                          <span className="font-bold"> {projeto?.nome}</span>
                        </div>
                        <div>
                          Poa:{' '}
                          <span className="font-bold"> {poa?.descricao}</span>
                        </div>
                      </div>
                    }

                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative">
                      <div>
                        <Menu.Button className="rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-custom-green focus:ring-gray-normal">
                          <span className="sr-only">Open user menu</span>
                          {session.user?.image ? (
                            <img
                              className="h-8 w-10 rounded-full"
                              src={session.user?.image}
                              alt=""
                            />
                          ) : (
                            <div className="ml-auto bg-gray-300 flex-shrink-0 p-1 rounded-full">
                              <UserIcon
                                className="block h-6 w-6 text-black"
                                aria-hidden="true"
                              />
                            </div>
                          )}
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
                        <Menu.Items className="origin-top-right absolute z-20 right-0 mt-2 w-48 shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-md">
                          {userNavigation.map((item: any, key: any) => (
                            <Menu.Item key={key}>
                              {({ active }) => (
                                <Disclosure.Button
                                  as="a"
                                  href={item.href}
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                  onClick={item.click}
                                  aria-hidden="true"
                                >
                                  {item.name}
                                </Disclosure.Button>
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
                <Disclosure.Button className="bg-gray-200 inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-700 hover:bg-gray-300">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation?.map(
                (item, key) =>
                  // item.visible &&
                  (!item.subMenu ? (
                    <Disclosure.Button
                      key={key}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-custom-green text-white'
                          : 'text-gray-700 hover:opacity-50 hover:text-white',
                        'block px-3 py-2 rounded-md text-sm transition-all'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ) : (
                    <Popover as="div" className="w-full" key={key}>
                      {({ open }) => (
                        <>
                          <div>
                            <Popover.Button className="inline-flex w-full rounded-md px-3 py-2 text-gray-700 hover:text-white transition duration-500 ease-in-out hover:bg-custom-green">
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
                            <Popover.Panel className="z-30 relative lg:right-0 w-full mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none">
                              {item.subMenuItems
                                ?.filter(
                                  (i: any) =>
                                    !NOT_DISPLAY_OPTIONS.includes(i.name)
                                )
                                .map((subMenu: any, subkey) => (
                                  <div
                                    className="px-2 py-2"
                                    key={subkey}
                                    aria-hidden="true"
                                  >
                                    {!subMenu.subMenuItems ? (
                                      <Disclosure.Button
                                        as={Link}
                                        href={subMenu.href}
                                        className={classNames(
                                          'hover:bg-gray-100',
                                          'group flex rounded-md items-center w-full px-2 py-2 text-sm'
                                        )}
                                        aria-hidden="true"
                                      >
                                        {subMenu?.icon && (
                                          <subMenu.icon
                                            className="flex-shrink-0 h-6 w-6 text-green-700"
                                            aria-hidden="true"
                                          />
                                        )}
                                        <div className="ml-4">
                                          <p className="text-base text-gray-900">
                                            {subMenu.name}
                                          </p>
                                          {subMenu?.description && (
                                            <p className="mt-1 text-sm text-gray-500">
                                              {subMenu?.description}
                                            </p>
                                          )}
                                        </div>
                                      </Disclosure.Button>
                                    ) : (
                                      <Popover
                                        as="div"
                                        className="w-full"
                                        key={subkey}
                                      >
                                        {({ open }) => (
                                          <>
                                            <div>
                                              <Popover.Button className="inline-flex w-full rounded-md px-2 py-2 text-gray-700 hover:text-white transition duration-500 ease-in-out hover:bg-gray-200">
                                                {subMenu?.icon && (
                                                  <subMenu.icon
                                                    className="flex-shrink-0 h-6 w-6 text-green-700"
                                                    aria-hidden="true"
                                                  />
                                                )}
                                                <div className="ml-4">
                                                  <span className="text-base text-gray-900">
                                                    {subMenu.name}
                                                  </span>
                                                </div>
                                                {open ? (
                                                  <ChevronUpIcon
                                                    className={classNames(
                                                      open
                                                        ? 'text-gray-400'
                                                        : 'text-gray-400',
                                                      'w-5 h-5 ml-4 -mr-1'
                                                    )}
                                                    aria-hidden="true"
                                                  />
                                                ) : (
                                                  <ChevronDownIcon
                                                    className={classNames(
                                                      open
                                                        ? 'text-gray-400'
                                                        : 'text-gray-400',
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
                                              <Popover.Panel className="z-30 relative lg:right-0 w-full mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none">
                                                {subMenu.subMenuItems?.map(
                                                  (
                                                    subsubMenu: any,
                                                    subsubKey: any
                                                  ) => (
                                                    <Disclosure.Button
                                                      as={Link}
                                                      key={subsubKey}
                                                      href={subsubMenu.href}
                                                      className={classNames(
                                                        !subsubMenu?.icon &&
                                                          'pl-10',
                                                        'hover:bg-gray-100 pl-4',
                                                        'group flex rounded-md items-center w-full px-2 py-2 text-sm'
                                                      )}
                                                      aria-hidden="true"
                                                    >
                                                      {subsubMenu?.icon && (
                                                        <subsubMenu.icon
                                                          className="flex-shrink-0 h-6 w-6 text-green-700"
                                                          aria-hidden="true"
                                                        />
                                                      )}
                                                      <div className="ml-4">
                                                        <p className="text-base text-gray-900">
                                                          {subsubMenu.name}
                                                        </p>
                                                        {subsubMenu?.description && (
                                                          <p className="mt-1 text-sm text-gray-500">
                                                            {
                                                              subsubMenu?.description
                                                            }
                                                          </p>
                                                        )}
                                                      </div>
                                                    </Disclosure.Button>
                                                  )
                                                )}
                                              </Popover.Panel>
                                            </Transition>
                                          </>
                                        )}
                                      </Popover>
                                    )}
                                  </div>
                                ))}
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))
              )}
            </div>
            {
              //Mobile
              session ? (
                <div className="pt-4 pb-3 border-y border-gray-300 shadow-lg rounded-b-lg">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      {session && session.user?.image ? (
                        <img
                          className="h-10 w-10 rounded-full"
                          src={session.user?.image}
                          alt=""
                        />
                      ) : (
                        <div className="ml-auto bg-gray-300 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                          <UserIcon
                            className="block h-6 w-6 text-black"
                            aria-hidden="true"
                          />
                        </div>
                      )}
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-gray-700">
                        {session && session.user?.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-600">
                        {session && session.user?.email}
                      </div>
                    </div>
                    <Menu
                      as="div"
                      className="ml-3 relative flex items-center justify-end  w-full"
                    >
                      <div>
                        <Menu.Button className="rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-700 focus:ring-white">
                          <div className="bg-gray-light hover:bg-gray-normal transition-all duration-200 ease-in-out p-1 rounded-full text-gray-400 hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-800 focus:ring-white">
                            <ArrowsRightLeftIcon className="w-6 h-6 text-custom-green" />
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
                        <Menu.Items className="origin-top-right absolute z-20 right-0 mt-2 w-48 shadow-lg py-1 bg-white focus:outline-none rounded-md">
                          {['Mudar Projeto Ativo', 'Mudar Poa Ativo'].map(
                            (item: any, key: any) => (
                              <Menu.Item key={key}>
                                {({ active }) => (
                                  <Menu.Button
                                    as="a"
                                    href="#"
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      key === 0
                                        ? changeProjetoModal()
                                        : changePoaModal();
                                    }}
                                    aria-hidden="true"
                                  >
                                    {item}
                                  </Menu.Button>
                                )}
                              </Menu.Item>
                            )
                          )}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                  <div className="mt-3 px-2 space-y-1" aria-hidden="true">
                    {userNavigation.map((item: any, key: any) => (
                      <Disclosure.Button
                        key={key}
                        as={Link}
                        href={item.href}
                        className="block px-3 py-2 rounded-md text-base text-gray-700 hover:text-white hover:bg-custom-green"
                        onClick={item.click}
                        aria-hidden="true"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="px-3 pb-2 -mt-1">
                  <Link
                    href="/login"
                    className="block px-2 py-2 rounded-md text-base text-gray-700 hover:text-white hover:bg-custom-green hover:transition-all"
                  >
                    Login
                  </Link>
                </div>
              )
            }
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
