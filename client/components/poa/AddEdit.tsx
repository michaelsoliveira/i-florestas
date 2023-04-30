import { OptionType, Select } from '../Select'
import { FormInput } from '../FormInput'
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import alertService from '../../services/alert'
import { AuthContext } from '../../contexts/AuthContext'
import { useSession } from 'next-auth/react'
import { LinkBack } from '../LinkBack'
import { Link } from '../Link'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { RootState } from '../../store'
import { setPoa } from "../../store/poaSlice"
import { ProjetoContext } from 'contexts/ProjetoContext'

const AddEdit = ({ id }: any) => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const [upa, setUpa] = useState<OptionType>()
    const [respTecElab, setRespTecElab] = useState<OptionType>()
    const [respTecExec, setRespTecExec] = useState<OptionType>()
    const [respTecElabs, setRespTecElabs] = useState<any>()
    const [upas, setUpas] = useState<any>()
    const { client } = useContext(AuthContext)
    const { projeto } = useContext(ProjetoContext)
    const umf = useAppSelector((state: RootState) => state.umf)
    const dispatch = useAppDispatch()
    const { data: session } = useSession()
    const router = useRouter()
    const isAddMode = !id

    const loadUpas = async (inputValue: string, callback: (options: OptionType[]) => void) => {
        const response = await client.get(`/projeto/${projeto?.id}/upa?search=${inputValue}`)
        const { upas } = response.data
        
        callback(upas?.map((upa: any) => ({
            value: upa.id,
            label: upa.descricao
        })))
    }

    const loadRespTecElab = async (inputValue: string, callback: (options: OptionType[]) => void) => {
        const response = await client.get(`/poa/${projeto?.id}/resp-tec-elab?search=${inputValue}`)
        const { respTecElab } = response.data
        
        callback(upas?.map((upa: any) => ({
            value: respTecElab.id,
            label: respTecElab.nome
        })))
    }

    useEffect(() => {        
        async function loadPoa() {
            
            if (!isAddMode && typeof session !== typeof undefined) {
                
                const { data: poa } = await client.get(`/poa/${id}`)
                
                // setUpa({
                //     label: poa?.upa?.descricao,
                //     value: poa?.upa?.id
                // })
               
                for (const [key, value] of Object.entries(poa)) {
                    switch(key) {
                        // case 'equacao_volume': setValue('equacao_volume', upa.equacao_volume?.id);
                        // break;
                        // case 'spatial_ref_sys': setValue('spatial_ref_sys', upa.spatial_ref_sys?.srid);
                        // break;
                        // case 'umf': setValue('umf', upa.umf?.id);
                        // break;
                        // case 'tipo': setValue('tipo', upa?.tipo.toString());
                        // break;
                        default: {
                            setValue(key, value, {
                                shouldValidate: true,
                                shouldDirty: true
                            })
                        }
                    }
                }
            }
        }
        
        loadPoa()

    }, [session, isAddMode, client, id, setValue])

    useEffect(() => {
        const defaultOptions = async () => {
            if (typeof session !== typeof undefined){
                const upasResponse = await client.get(`/upa/${projeto?.id}?orderBy=nome&order=asc`)
                const { upas } = upasResponse.data

                const respTecElabResponse = await client.get(`/poa/${projeto?.id}/resp-tec-elabs?orderBy=nome&order=asc`)
                const { respTecElabs } = respTecElabResponse.data

                setUpas(upas)
                setRespTecElabs(respTecElabs)
            }
        }
        defaultOptions()    
        
    }, [session, client, projeto])

    const selectedRespTecElab = (data: any) => {
        setRespTecElab(data)
        setValue('respTecElab', data?.value)
    }

    async function onSubmit(data: any) {
        try {
            return isAddMode
                ? createPoa(data)
                : updatePoa(id, data)
        } catch (error: any) {
            alertService.error(error.message);
        }
        
    }

    function getUpasDefaultOptions() {
        return upas?.map((upa: any) => {
            return {
                label: upa.descricao,
                value: upa.id
            }
        })
    }

    function getRespTecElabOptions() {
        return respTecElabs?.map((respTecElab: any) => {
            return {
                label: respTecElab.nome,
                value: respTecElab.id
            }
        })
    }

    async function createPoa(data: any) {
        await client.post('poa', {
            ...data
        })
            .then((response: any) => {
                const { error, message } = response.data
                if (!error) {
                    alertService.success(message);
                    router.push('/poa')
                } else {
                    alertService.error(message)
                }
            }) 
    }

    async function updatePoa(id: string, data: any) {
        
        await client.put(`/poa/${id}`, {
            // umf: umf.id,
            ...data
        })
            .then((response: any) => {
                const { error, message, poa } = response.data
                if (!error) {
                    dispatch(setPoa({
                        id: poa.id,
                        descricao: poa.descricao,
                        data_ultimo_plan: poa.data_ultimo_plan,
                        pmfs: poa.pmfs
                    }))
                    alertService.success(message);
                    router.push('/poa')
                } else {
                    alertService.error(message)
                }
            })
    }

    return (
        <div>
            <div className="py-6 flex flex-col justify-center sm:py-12 bg-gray-50">
                
                <div className="relative py-3 w-11/12 max-w-none lg:max-w-5xl mx-auto">
                    <div className='flex flex-row border-x-2 border-t-2 border-green-600 text-white items-center justify-between shadow-lg bg-gradient-to-r from-green-700 to-green-500 py-4 sm:rounded-t-xl'>
                        
                        <div>
                            <LinkBack href="/upa" className="flex flex-col relative left-0 ml-4" />
                        </div>
                        <div>
                            {isAddMode ? (
                                <h1 className='text-xl'>Cadastrar POA</h1>
                            ): (
                                <h1 className='text-xl'>Editar POA</h1>
                            )}
                        </div>
                        <div></div>
                    </div>
                    <div className="relative p-8 bg-white shadow-sm sm:rounded-b-xl border-x-2 border-b-2 border-green-600">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='flex flex-col lg:flex-row md:flex-row space-x-0 md:space-x-4'>
                                <div className='w-4/12'>
                                    <FormInput
                                        name="descricao"
                                        label="Descricao"
                                        register={register}
                                        errors={errors}
                                        rules={
                                            {
                                                required: 'O campo nome é obrigatório',
                                                minLength: {
                                                    value: 3,
                                                    message: 'Por favor, preencha o campo com no mínimo 3 caracteres'
                                                }
                                            }
                                        }
                                        id="ano"
                                        className="pb-4"
                                    />
                                </div>
                            
                                <div className='lg:w-3/12'>
                                    <FormInput
                                        id="pmfs"
                                        name="pmfs"
                                        label="Protocolo PMFS"
                                        type="text"
                                        register={register}
                                        errors={errors}
                                        className="pb-4"
                                    />
                                </div>

                            <div className="border border-gray-200 p-4 mt-4 rounded-md">
                                <span className="text-gray-700">Responsáveis Técnicos</span>
                                <div className="mt-2">
                                <span className="text-gray-700 py-2">Responsavel Tecnico Pela Elaboracao</span>
                                        <div className='mt-2'>
                                            <Select
                                                placeholder='Selecione o Sistema de Coordenadas'
                                                selectedValue={respTecElab}
                                                defaultOptions={getRespTecElabOptions()}
                                                options={loadRespTecElab}
                                                label="Sistema de Coordenada"
                                                callback={selectedRespTecElab}
                                            />
                                            </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col lg:flex-row space-y-4 mt-4 lg:space-y-0 space-x-0 lg:space-x-4'>
                                <div className='lg:w-1/2 border border-gray-200 rounded-lg p-4'>
                                    <span className="text-gray-700 py-2">Coordenadas</span>
                                        <div className='mt-2'>
                                            {/* <Select
                                                placeholder='Selecione o Sistema de Coordenadas'
                                                selectedValue={sysRef}
                                                defaultOptions={getSysRefDefaultOptions()}
                                                options={loadSysRefs}
                                                label="Sistema de Coordenada"
                                                callback={selectedSysRef}
                                            /> */}
                                            </div>
                                    </div>
                                    <div className='lg:w-1/2 border border-gray-200 rounded-lg p-4'>
                                    <span className="text-gray-700 py-2">Equação</span>
                                    <div className='mt-2'>
                                        {/* <Select
                                            placeholder='Selecione uma Equacao'
                                            selectedValue={equacao_volume}
                                            defaultOptions={getUpasDefaultOptions()}
                                            options={loadUpas}
                                            label="Volume da Árvore"
                                            callback={selectedEquacao}
                                        /> */}
                                    </div>
                                    </div>
                                </div>
                            <div className='flex items-center justify-between pt-4'>
                                <Link href="/upa" className="text-center w-1/5 bg-gradient-to-r from-orange-600 to-orange-400 text-white p-3 rounded-md">Voltar</Link>
                                <button className="w-1/5 bg-green-600 text-white p-3 rounded-md">Salvar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddEdit