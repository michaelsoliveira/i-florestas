'use client'

import { useCallback, useContext, useEffect, useState, CSSProperties, useMemo } from "react"
import { AuthContext } from "@/context/AuthContext"
import { LoadingContext } from "@/context/LoadingContext"
import { CsvDataService } from "@/services/create-csv"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { RootState } from "@/redux/store"
import { OptionType, Select } from "@/components/utils/Select"
import { ProjetoContext } from "@/context/ProjetoContext"
import { setUmf } from "@/redux/features/umfSlice"
import { setUpa } from "@/redux/features/upaSlice"
import alertService from '@/services/alert'
import { useCSVReader } from 'react-papaparse'
import Table, { AvatarCell, SelectColumnFilter, StatusPill } from "@/components/utils/Table"
import { Button } from "@/components/utils/Button"
import { StepContext } from "@/context/StepContext"
import classNames from "classnames"
import SelectFileStep from "./steps/SelectFileStep"
import Finalizar from "./steps/Finalizar"
import Stepper from "../utils/Stepper"
import Errors from "./steps/Errors"

const styles = {
    csvReader: {
      display: 'flex',
      flexDirection: 'row',
      marginBottom: 10,
    } as CSSProperties,
    progressBarBackgroundColor: {
      backgroundColor: 'green',
    } as CSSProperties,
  };

const Index = () => {
    
    const [uploading, setUploading] = useState<boolean>(false)
    const { client } = useContext(AuthContext)
    const { setLoading } = useContext(LoadingContext)
    const [umfs, setUmfs] = useState<any>()
    const [upas, setUpas] = useState<any>()
    const [uts, setUts] = useState<any>()
    const [especies, setEspecies] = useState<any>()
    const [arvores, setArvores] = useState<any>()
    const umf = useAppSelector((state: RootState) => state.umf)
    const upa = useAppSelector((state: RootState) => state.upa)
    const [selectedUmf, setSelectedUmf] = useState<OptionType>()
    const [selectedUpa, setSelectedUpa] = useState<OptionType>()
    const { projeto } = useContext(ProjetoContext)
    const [columnData, setColumnData] = useState([])
    const [rowData, setRowData] = useState([])
    const [encoding, setEncoding] = useState('iso-8859-1')
    const { CSVReader } = useCSVReader()
    const poa = useAppSelector((state: RootState) => state.poa)
    const { step, nextStep, prevStep, data: dataStep, updateData, resetData, setStep } = useContext(StepContext)
    
    const steps = [
        "Arquivo",
        "Erros",
        "Finalizar"
    ]

    const dispatch = useAppDispatch()
      
    const columns = useMemo(() => columnData, [columnData])
    
    const data = useMemo(() => rowData, [rowData])

    const loadUpas = async (inputValue: string, callback: (options: OptionType[]) => void) => {
        const data = upas.filter((upa: any) => upa?.descricao.toLowerCase().includes(inputValue.toLowerCase()))

        
        callback(data?.map((upa: any) => ({
            value: upa.id,
            label: upa.descricao
        })))
    }

    const loadUmfs = async (inputValue: string, callback: (options: OptionType[]) => void) => {
        const data = umfs.filter((umf: any) => umf?.nome.toLowerCase().includes(inputValue.toLowerCase()))
        
        callback(data?.map((umf: any) => ({
            value: umf.id,
            label: umf.nome
        })))
    }

    const defaultUmfsOptions = useCallback(async() => {
        const response = await client.get(`/umf?orderBy=nome&order=asc`)
        
            const { umfs } = response.data
            setUmfs(umfs)

            const compareUmf = umfs ? umfs.find((u: any) => u.id === umf.id) : null
            
            if (compareUmf) {
                setSelectedUmf({
                    value: umf?.id,
                    label: umf?.nome
                })
            }

            if (umfs.length === 0) {
                setSelectedUmf({
                    value: '0',
                    label: 'Nenhuma UMF Cadastrada'
                })
            } 
    }, [client, umf.id, umf?.nome])

    const defaultUpasOptions = useCallback(async () => {
        const response = await client.get(`/upa?orderBy=descricao&order=asc&umf=${umf?.id}`)
            const { upas } = response.data
            setUpas(upas)
            if (upas.length === 0) {
                setSelectedUpa({
                    value: '0',
                    label: 'Nenhuma UPA Cadastrada'
                })
            }

            const compareUpa = upas ? upas.find((u: any) => u.id === upa.id) : null

            if (compareUpa) {
                setSelectedUpa({
                    value: upa?.id,
                    label: upa?.descricao
                })
            }
    }, [client, umf?.id, upa?.descricao, upa.id])

    const getUts = useCallback(async () => {
        const response = await client.get(`/ut?upaId=${upa?.id}`)
            const { error, uts } = response.data
            setUts(uts)
    }, [client, upa?.id])

    const getArvores = useCallback(async() => {
        const response = await client.get(`/arvore/get-all`)
        const { arvores } = response.data
        setArvores(arvores)
    }, [client])

    const getEspecies = useCallback(async () => {
    
            const response = await client.get(`/especie?order=asc&orderBy=especie.nome`)
            const { especies } = response.data
            setEspecies(especies) 
    }, [client])

    useEffect(() => {
        defaultUmfsOptions()
        defaultUpasOptions()
        getUts()
        getEspecies()
        getArvores()
    }, [defaultUmfsOptions, defaultUpasOptions, getUts, getEspecies, getArvores])

    const getData = (data: any) => {
        
        const columns = data?.length > 0 ? Object.keys(data[0]).map((col: any, index: any) => {
            const accessor = col.normalize("NFD").replace(" - ", " ").replace(/[^0-9a-zA-Z\s_]/g, "").split(" ").join("_").toLowerCase()
            if (accessor === 'ut' || accessor === 'especie') {
                return {
                    Header: col,
                    accessor,
                    Filter: SelectColumnFilter
                }
            } else {
                return {
                    Header: col,
                    accessor
                }
            }
        }) : []

        return {
            columns,
            data
        }
    }
    
    const nomeEspecies = especies?.length > 0 
        ? especies.map((especie: any) => especie.nome)
        : [];

    const numUts = uts?.length > 0
        ? uts.map((ut: any) => ut?.numero_ut.toString())
        : []
    
    const numArvores = arvores?.length > 0 
        ? arvores.map((arv: any) => arv.numero_arvore)
        : []

    const arvoresUploaded: any = rowData.length > 0 
        ? rowData
        : []
    const especiesNotFound = arvoresUploaded.filter((arvore: any) => !nomeEspecies.includes(arvore.especie))
    
    const numArvoreExists = arvoresUploaded.filter((arvore: any) => String(numArvores).includes(String(arvore.numero_arvore)))
    
    const utsNotFound = arvoresUploaded?.filter((arvore: any) => !numUts.includes(String(arvore?.ut)))

    const utsData: any = utsNotFound?.length > 0 ? getData(utsNotFound) : []

    const especiesData: any = especiesNotFound?.length > 0 ? getData(especiesNotFound) : []

    const numArvoresData: any = numArvoreExists?.length > 0 ? getData(numArvoreExists) : []
    
    const selectUmf = async (umf: any) => {
        dispatch(setUmf({
            id: umf.value,
            nome: umf.label
        }))
        setSelectedUmf(umf)

        const response = await client.get(`/upa?orderBy=descricao&order=asc&umf=${umf.value}`)
        const { upas } = response.data
        
        setUpas(upas)
    }

    const selectUpa = async (upa: any) => {
        const upaSelected = upas.find((u: any) => u.id === upa.value)
        
        dispatch(setUpa({
            id: upaSelected.id,
            descricao: upaSelected.descricao,
            tipo: Number.parseInt(upaSelected.tipo)
        }))
        setSelectedUpa(upa)
        
    }

    function getUmfsDefaultOptions() {
        return umfs?.map((umf: any) => {
            return {
                label: umf.nome,
                value: umf.id
            }
        })
    }

    function getUpasDefaultOptions() {
        return upas?.map((upa: any) => {
            return {
                label: upa.descricao,
                value: upa.id
            }
        })
    }

    const handleImportTemplate = async () => {
        const data = upa.tipo === 0 ? [
            { ut: 1, numero_arvore: 1, especie: 'Abiu', dap: 10, altura: 20.0, qf: 1, ponto_gps: 1, latitude: 2.565, longitude: 0.56, obs: '', comentario: '' },
            { ut: 1, numero_arvore: 2, especie: 'Abiu', dap: 15, altura: 17.3, qf: 1, ponto_gps: 2, latitude: 7.544, longitude: 1.24, obs: '', comentario: '' },
            { ut: 1, numero_arvore: 3, especie: 'Especie Teste', dap: 13.5, altura: 15.4, qf: 1, ponto_gps: 3, latitude: 14.224, longitude: 4.67, obs: '', comentario: ''},
        ] : [
            { ut: 1, faixa: 1, numero_arvore: 1, especie: 'Abiu', dap: 10, altura: 20.0, qf: 1, orient_x: 'D', coord_x: 7.5, coord_y: 10, obs: '', comentario: '' },
            { ut: 1, faixa: 1, numero_arvore: 2, especie: 'Abiu', dap: 15, altura: 17.3, qf: 1, orient_x: 'D', coord_x: 12.5, coord_y: 10, obs: '', comentario: '' },
            { ut: 1, faixa: 1, numero_arvore: 3, especie: 'Especie Teste', dap: 13.5, altura: 15.4, qf: 1, orient_x: 'D', coord_x: 22.4, coord_y: 10, obs: '', comentario: ''},
        ]
        
        CsvDataService.exportToCsv(upa.tipo === 0 ? 'template_inventario_gps' : 'template_inventario_xy', data)
    }

    const handleImportInventario = async () => {
        try {
            if (uts.length === 0) return alertService.warn('Por favor, crie as UTs antes de realizar a importação')
            const { data } = await client.get('/poa?order=asc&orderBy=descricao')
            if (data?.count === 0 || poa.id === '') {
                return alertService.warn('Por favor, crie ou selecione um POA para iniciar a importação do inventário')
            } else {
                console.log(utsNotFound, especiesNotFound)
                if (utsNotFound.length > 0) return alertService.error('Existem árvores que não foi informado a UT ou não cadastrada')
                if (especiesNotFound.length > 0) return alertService.error('Existem espécies na planilha que não foram cadastras');
                if (numArvoreExists.length > 0) return alertService.error('Existem árvores já cadastradas com o(s) dados informados na planilha, verifique os detalhes em "Errors"')
                setLoading(true)
                await client.post(`/arvore/import-inventario?upaId=${upa?.id}`, {
                    columns: columnData,
                    data: rowData
                })
                .then((result: any) => {
                    setLoading(false)
                    const { data } = result
                    if (!data.error) {
                        alertService.success(data?.message)
                    } else {
                        alertService.warn(data?.message)
                    }
                })
            }
            
        } catch(e) {

        }
    }

    const handleFocusBack = () => {
        setUploading(false)
        window.removeEventListener('focus', handleFocusBack)
    }

    const onUploadAccepted = (result: any) => {
        const columns = result.data[0].map((col: any, index: any) => {
            const accessor = col.normalize("NFD").replace(" - ", " ").replace(/[^0-9a-zA-Z\s_]/g, "").split(" ").join("_").toLowerCase()
            if (accessor === 'ut' || accessor === 'especie') {
                return {
                    Header: col,
                    accessor,
                    Filter: SelectColumnFilter
                }
            } else {
                return {
                    Header: col,
                    accessor
                }
            }
        })

        const rows = result.data.slice(1).map((row: any, idx: number) => {
            return row.reduce((acc: any, curr: any, index: any) => {
                acc[columns[index].accessor] = curr;
                return {
                    linha: idx + 1,
                    ...acc
                };
            }, {})
        })
        
        setColumnData(columns)
        setRowData(rows)
    }

    const displayStep = () => {
        const renderStep = () => {
            switch (step) {
              case 1:
                return <SelectFileStep columns={columns} data={data} />;
              case 2:
                return <div><Errors errors={{utsData, especiesData, numArvoresData}} /></div>
              case 3:
                return <>
                <div className="flex flex-row items-center justify-center text-sm mt-10 border max-w-4xl mx-auto py-8 rounded-lg">
                    Clique no botão "Finalizar Importação" para realizar a importação inventário
                </div>
                </>;
              default: <>Importação do Inventário</>
            }
        }
        
        return renderStep()
    }

    function handleNext(): void {
        if (step === 2) {
            if (utsData?.data?.length > 0) return alertService.error('Existe erro na coluna de UT')
            if (especiesData?.data?.length > 0) return alertService.error('Existe erro na coluna de espécie')
            if (numArvoresData?.data?.length > 0) return alertService.error('Existe erro na coluna de número árvore')

            nextStep()
        } else {
            nextStep()
        }

        if (step === 3) {
            handleImportInventario()
            resetData()
        }
    }

    return (
        <div>
            <div className="flex flex-col md:flex-row items-center justify-between p-4 w-full">
                    <CSVReader 
                        config={
                            {
                                skipEmptyLines: true,
                                encoding
                            }
                        }
                        onUploadAccepted={onUploadAccepted}
                    >
                    {({
                        getRootProps,
                        acceptedFile,
                        ProgressBar,
                        getRemoveFileProps,
                    }: any) => (
                        <>
                        <div className="flex flex-col md:flex-row text-sm items-center justify-center align-middle space-x-2">
                            
                            <select
                                className="p-1 w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={encoding}
                                onChange={e => {
                                    setEncoding(String(e.target.value))
                                }}
                            >
                                
                                {["iso-8859-1", "utf-8"].map(pageSize => (
                                <option key={pageSize} value={pageSize}>
                                    {pageSize}
                                </option>
                                
                                ))}
                                
                            </select>
                            
                            <div className="w-full py-2">
                                <a 
                                    {...getRootProps()} 
                                    className="bg-indigo w-40 hover:bg-indigo-dark text-green-700 font-bold py-1 border rounded-lg px-4 inline-flex align-middle hover:cursor-pointer"
                                >
                                    <svg className="fill-green-700 w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 0h24v24H0z" fill="none"/>
                                        <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/>
                                    </svg>
                                    <span className="ml-2">{uploading ? "Abrindo..." : "Abrir Planilha"}</span>
                                </a>
                                </div>
                                <div className="flex flex-row w-full space-x-2 items-center justify-center align-middle">
                                   
                                    { acceptedFile && (
                                        <>
                                            <div className="inline-block">{acceptedFile.name}</div>
                                            <Button {...getRemoveFileProps()}
                                                className="text-red-700 hover:cursor-pointer justify-center w-24"
                                            >
                                                Remove
                                            </Button>
                                    </>
                                    )}
                                   
                                </div>
                                <div className="col-span-4 pt-1">
                                    <ProgressBar style={styles.progressBarBackgroundColor} />
                                </div>
                            </div>
                        </>
                    )}
                </CSVReader>        

                <div className="flex flex-row">
                    <a
                        onClick={handleImportTemplate}
                        className="bg-indigo hover:bg-indigo-dark text-green-700 font-bold py-2 px-4 w-full inline-flex items-center hover:cursor-pointer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>

                        <span className="ml-2">Modelo</span>
                    </a>
                </div>
            </div>
                <div className="flex flex-col p-6">
                    <div className="pb-2">
                        <h1 className="text-xl font-semibold text-custom-green">Importação do Inventário</h1>
                    </div>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-items-center py-4 bg-custom-green rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full lg:w-3/5 px-4">
                            <div>
                                <Select
                                    styleLabel="text-white"
                                    initialData={
                                        {
                                            label: 'Selecione UMF...',
                                            value: ''
                                        }
                                    }
                                    selectedValue={selectedUmf}
                                    defaultOptions={getUmfsDefaultOptions()}
                                    options={loadUmfs}
                                    label="UMF:"
                                    callback={selectUmf}
                                />
                            </div>
                            <div>
                                <Select
                                    styleLabel="text-white"
                                    initialData={
                                        {
                                            label: 'Selecione UPA...',
                                            value: ''
                                        }
                                    }
                                    selectedValue={selectedUpa}
                                    defaultOptions={getUpasDefaultOptions()}
                                    options={loadUpas}
                                    label="UPA:"
                                    callback={(e) => {selectUpa(e)}}
                                />
                            </div>
                        </div>
     
                    </div>
            <Stepper
                steps= { steps }
                currentStep={step}
            />
            <div>
                { displayStep() }
            </div>
 
            <div className="flex justify-between mt-4">
                <div>
                    <button
                        onClick={() => prevStep()}
                        className={classNames("bg-white text-gray-dark uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-200 hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out",
                        step === 1 && "hidden")}
                    >
                        Voltar
                    </button>
                </div>
                <button
                    onClick={() => handleNext()}
                    className={classNames(
                        "bg-custom-green text-white uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-200 hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out",
                        )}
                >
                    { step === steps.length? "Finalizar Importação" : "Prosseguir" }
                </button>
            </div>
    
        </div>    
    </div>
    )
}

export default Index
