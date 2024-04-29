import Table from "@/components/ui/Table"
import { Tab } from "@headlessui/react"
import classNames from "classnames"

const Errors = ( { errors, index }: { errors: any, index?: number } ) => {
    const { utsData, especiesData, numArvoresData, obsData, dapData, alturaData }: any = errors
 
    return (
        <div className="border border-gray-200 p-4 rounded-md col-span-6 relative mt-10">
            <span className="text-gray-700 absolute -top-3 bg-white px-2 text-sm">Errors</span>
            { !utsData && !especiesData && !numArvoresData && !obsData 
                ? (
                    <><div className="flex flex-items items-center justify-center pt-6 text-gray-dark">Nenhum erro encontrado nas colunas</div></>) 
                : (
            <Tab.Group selectedIndex={index}>
                <Tab.List className="flex p-1 space-x-2 bg-custom-green/50 rounded-lg">
                    { utsData?.data?.length > 0 && (
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
                            <span className='font-bold'>UT</span>
                        </Tab>
                    ) }
                    { dapData?.data?.length > 0 && (
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
                            <span className='font-bold'>DAP (não númerico)</span>
                        </Tab>
                    ) }
                    { alturaData?.data?.length > 0 && (
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
                            <span className='font-bold'>Altura</span>
                        </Tab>
                    ) }
                    {
                        especiesData?.data?.length > 0 && (
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
                                <span className='font-bold'>Espécie</span>
                            </Tab>
                        ) 
                    }
                    {
                        numArvoresData?.data?.length > 0 && (
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
                                <span className='font-bold'>Núm Arvores Duplicadas</span>
                            </Tab>
                        )
                    }
                    {
                        obsData?.data?.length > 0 && (
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
                                <span className='font-bold'>Observação não encontrada</span>
                            </Tab>
                        )
                    }
                    </Tab.List>
                    <Tab.Panels>
                        {
                            utsData?.data?.length > 0 && (
                                <Tab.Panel
                                    className={classNames(
                                        'px-4 pt-4 text-left justify-center items-center'
                                    )}
                                >
                                    <div className="overflow-x-hidden w-full">
                                        <Table columns={utsData?.columns} data={utsData?.data} />
                                    </div>                                      
                                </Tab.Panel>
                                ) 
                            }
                    
                        {
                            especiesData?.data?.length > 0 && (
                                <Tab.Panel
                                    className={classNames(
                                        'px-4 pt-4 text-left justify-center items-center'
                                    )}
                                >
                                    <div>
                                        {/* <span className="flex py-2 px-2 font-medium text-lg w-full bg-indigo-100 my-4 rounded-md">Valor Vazio</span> */}
                                        <div className="overflow-x-hidden w-full">
                                            <Table columns={especiesData?.columns} data={especiesData?.data} />
                                        </div>
                                    </div>
                                </Tab.Panel>
                            ) 
                        }
                        {
                            numArvoresData?.data?.length > 0 && (
                                <Tab.Panel
                                    className={classNames(
                                        'px-4 pt-4 text-left justify-center items-center'
                                    )}
                                >
                                    <div>
                                        {/* <span className="flex py-2 px-2 font-medium text-lg w-full bg-indigo-100 my-4 rounded-md">Valor Vazio</span> */}
                                        <div className="overflow-x-hidden w-full">
                                            <Table columns={numArvoresData?.columns} data={numArvoresData?.data} />
                                        </div>
                                    </div>
                                </Tab.Panel>
                            )
                        }
                        {
                            dapData?.data?.length > 0 && (
                                <Tab.Panel
                                    className={classNames(
                                        'px-4 pt-4 text-left justify-center items-center'
                                    )}
                                >
                                    <div>
                                        {/* <span className="flex py-2 px-2 font-medium text-lg w-full bg-indigo-100 my-4 rounded-md">Valor Vazio</span> */}
                                        <div className="overflow-x-hidden w-full">
                                            <Table columns={dapData?.columns} data={dapData?.data} />
                                        </div>
                                    </div>
                                </Tab.Panel>
                            )
                        }
                        {
                            alturaData?.data?.length > 0 && (
                                <Tab.Panel
                                    className={classNames(
                                        'px-4 pt-4 text-left justify-center items-center'
                                    )}
                                >
                                    <div>
                                        {/* <span className="flex py-2 px-2 font-medium text-lg w-full bg-indigo-100 my-4 rounded-md">Valor Vazio</span> */}
                                        <div className="overflow-x-hidden w-full">
                                            <Table columns={alturaData?.columns} data={alturaData?.data} />
                                        </div>
                                    </div>
                                </Tab.Panel>
                            )
                        }
                        {
                            obsData?.data?.length > 0 && (
                                <Tab.Panel
                                    className={classNames(
                                        'px-4 pt-4 text-left justify-center items-center'
                                    )}
                                >
                                    <div>
                                        {/* <span className="flex py-2 px-2 font-medium text-lg w-full bg-indigo-100 my-4 rounded-md">Valor Vazio</span> */}
                                        <div className="overflow-x-hidden w-full">
                                            <Table columns={obsData?.columns} data={obsData?.data} />
                                        </div>
                                    </div>
                                </Tab.Panel>
                            )
                        }
                </Tab.Panels>
            </Tab.Group>
            )
            }
        </div>
    )
}

export default Errors