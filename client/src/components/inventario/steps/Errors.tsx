import Table from "@/components/utils/Table"
import { Tab } from "@headlessui/react"
import classNames from "classnames"

const Errors = ( { errors, index }: { errors: any, index?: number } ) => {
    const { utsData, especiesData, numArvoresData }: any = errors
 
    return (
        <div className="border border-gray-200 p-4 rounded-md col-span-6 relative mt-10">
            <span className="text-gray-700 absolute -top-3 bg-white px-2 text-sm">Errors</span>

            <Tab.Group selectedIndex={index}>
                <Tab.List className="flex p-1 space-x-2 bg-custom-green/50 rounded-lg">
                    <Tab
                        className={({ selected }) =>
                            classNames(
                            'font-medium w-2/6 lg:w-1/6 py-2.5 text-sm leading-5 font-medium rounded-md transition-all',
                            'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-custom-green ring-white ring-opacity-60',
                            selected
                                ? 'bg-custom-green/75 text-white shadow hover:bg-gray-50/50 hover:text-custom-green'
                                : 'text-custom-green hover:bg-custom-green/50 hover:text-white'
                            )
                        }
                        >
                        <span className='font-bold'>UT</span>
                    </Tab>
                    <Tab
                        className={({ selected }) =>
                            classNames(
                            'font-medium w-2/6 lg:w-1/6 py-2.5 text-sm leading-5 font-medium rounded-md transition-all',
                            'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-custom-green ring-white ring-opacity-60',
                            selected
                                ? 'bg-custom-green/75 text-white shadow hover:bg-gray-50/50 hover:text-custom-green'
                                : 'text-custom-green hover:bg-custom-green/50 hover:text-white'
                            )
                        }
                        >
                        <span className='font-bold'>Espécie</span>
                    </Tab>
                    <Tab
                        className={({ selected }) =>
                        classNames(
                            'w-2/6 lg:w-1/6 py-2.5 text-sm leading-5 font-medium rounded-md transition-all',
                            'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-custom-green ring-white ring-opacity-60',
                            selected
                            ? 'bg-custom-green/75 text-white shadow hover:bg-gray-50/50 hover:text-custom-green'
                            : 'text-custom-green hover:bg-custom-green/50 hover:text-white'
                        )
                        }
                        >
                        <span className='font-bold'>Núm Arvore</span>
                        </Tab>
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel
                            className={classNames(
                                'px-4 pt-4 text-left justify-center items-center'
                            )}
                            >
                            {
                                utsData?.data?.length > 0 ? (
                                    <>
                                        {/* <span className="flex py-2 px-2 font-medium text-lg w-full bg-indigo-100 mb-2 rounded-md">UTs não encontradas</span> */}
                                        <div className="overflow-x-hidden w-full">
                                            <Table columns={utsData?.columns} data={utsData?.data} />
                                        </div>
                                    </>
                                ) : <><div className="flex flex-items items-center justify-center pt-6 text-gray-dark">Nenhum erro encontrado na coluna "UT"</div></>
                                }
                        </Tab.Panel>
                    <Tab.Panel
                        className={classNames(
                            'px-4 pt-4 text-left justify-center items-center'
                        )}
                    >
                        {
                            especiesData?.data?.length > 0 ? (
                                <div>
                                    {/* <span className="flex py-2 px-2 font-medium text-lg w-full bg-indigo-100 my-4 rounded-md">Valor Vazio</span> */}
                                    <div className="overflow-x-hidden w-full">
                                        <Table columns={especiesData?.columns} data={especiesData?.data} />
                                    </div>
                                </div>
                            ) : <><div className="flex flex-items items-center justify-center pt-6 text-gray-dark">Nenhum erro encontrado na coluna "Espécie"</div></>
                        }
                    </Tab.Panel>
                    <Tab.Panel
                        className={classNames(
                            'px-4 pt-4 text-left justify-center items-center'
                        )}
                    >
                        {
                            numArvoresData?.data?.length > 0 ? (
                                <div>
                                    {/* <span className="flex py-2 px-2 font-medium text-lg w-full bg-indigo-100 my-4 rounded-md">Valor Vazio</span> */}
                                    <div className="overflow-x-hidden w-full">
                                        <Table columns={numArvoresData?.columns} data={numArvoresData?.data} />
                                    </div>
                                </div>
                            ) : <><div className="flex flex-items items-center justify-center pt-6 text-gray-dark">Nenhum erro encontrado na coluna "Número Árvore"</div></>
                        }
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
            
        </div>
    )
}

export default Errors